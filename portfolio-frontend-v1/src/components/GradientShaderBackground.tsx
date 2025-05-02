import React, { useEffect, useRef } from 'react';

const vertexShader = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;
  uniform float time;
  uniform vec2 resolution;

  // Simplex noise function
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y;

    // Multiple moving noise layers
    float noise1 = snoise(st * 2.0 + time * 0.1);
    float noise2 = snoise(st * 3.0 - time * 0.15);
    float noise3 = snoise(st * 1.0 + time * 0.05);
    
    // Combine noise for dynamic effect
    float combinedNoise = (noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2) * 0.5 + 0.5;
    
    // First color: Deep blue - #2a0e61
    vec3 color1 = vec3(0.165, 0.055, 0.38);
    
    // Second color: Indigo - #1e1b4b
    vec3 color2 = vec3(0.118, 0.106, 0.294);
    
    // Third color: Deep blue - #0f1d5e
    vec3 color3 = vec3(0.059, 0.114, 0.369);
    
    // Fourth color: Purple - #1f0c4d
    vec3 color4 = vec3(0.122, 0.047, 0.302);

    // Create a complex multi-gradient
    vec3 color = mix(
      mix(color1, color2, smoothstep(0.0, 0.33, combinedNoise)),
      mix(color3, color4, smoothstep(0.66, 1.0, combinedNoise)),
      smoothstep(0.33, 0.66, combinedNoise)
    );

    // Add subtle sparkles
    float sparkleNoise = snoise(st * 50.0 + time * 0.5);
    sparkleNoise = pow(max(0.0, sparkleNoise), 15.0) * 0.3;
    
    // Final color with sparkles
    gl_FragColor = vec4(color + sparkleNoise, 1.0);
  }
`;

const GradientShaderBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  
  const initShader = (
    gl: WebGLRenderingContext, 
    type: number, 
    source: string
  ): WebGLShader | null => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    
    return shader;
  };
  
  const setupWebGL = (canvas: HTMLCanvasElement): boolean => {
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext;
    if (!gl) {
      console.error('WebGL not supported');
      return false;
    }
    
    glRef.current = gl;
    
    // Create vertex and fragment shaders
    const vShader = initShader(gl, gl.VERTEX_SHADER, vertexShader);
    const fShader = initShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
    
    if (!vShader || !fShader) return false;
    
    // Create and link program
    const program = gl.createProgram();
    if (!program) return false;
    
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      return false;
    }
    
    programRef.current = program;
    gl.useProgram(program);
    
    // Set up position attribute
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    
    // Create a square covering the entire canvas
    const positions = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
       1.0,  1.0,
      -1.0,  1.0,
    ]);
    
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    
    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    
    // Set up index buffer for triangle drawing
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    
    const indices = new Uint16Array([0, 1, 2, 0, 2, 3]);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    
    return true;
  };
  
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const gl = glRef.current;
    if (!canvas || !gl || !programRef.current) return;
    
    const pixelRatio = window.devicePixelRatio || 1;
    const width = window.innerWidth * pixelRatio;
    const height = window.innerHeight * pixelRatio;
    
    canvas.width = width;
    canvas.height = height;
    
    gl.viewport(0, 0, width, height);
    
    const resolutionLocation = gl.getUniformLocation(programRef.current, 'resolution');
    gl.uniform2f(resolutionLocation, width, height);
  };
  
  const render = () => {
    const gl = glRef.current;
    if (!gl || !programRef.current) return;
    
    // Update time uniform
    const time = (Date.now() - startTimeRef.current) / 1000;
    const timeLocation = gl.getUniformLocation(programRef.current, 'time');
    gl.uniform1f(timeLocation, time);
    
    // Draw
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    
    animationRef.current = requestAnimationFrame(render);
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const success = setupWebGL(canvas);
    if (success) {
      // Initial resize
      resizeCanvas();
      
      // Handle window resize
      const handleResize = () => {
        resizeCanvas();
      };
      
      window.addEventListener('resize', handleResize);
      
      // Start animation loop
      animationRef.current = requestAnimationFrame(render);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationRef.current);
        
        // Cleanup WebGL resources
        const gl = glRef.current;
        if (gl && programRef.current) {
          gl.deleteProgram(programRef.current);
        }
      };
    }
  }, []);
  
  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 z-[-2] pointer-events-none"
      style={{ width: '100vw', height: '100vh', opacity: 0.7 }}
    />
  );
};

export default GradientShaderBackground;