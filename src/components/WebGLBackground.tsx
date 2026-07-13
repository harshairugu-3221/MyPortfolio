import React, { useEffect, useRef } from "react";

interface WebGLBackgroundProps {
  isDarkMode: boolean;
}

export default function WebGLBackground({ isDarkMode }: WebGLBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const themeValueRef = useRef<number>(isDarkMode ? 1.0 : 0.0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.warn("WebGL not supported in this browser.");
      return;
    }

    // Vertex shader source
    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment shader source
    const fsSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_theme; // 0.0 = light, 1.0 = dark

      // Warped fluid wave pattern
      float pattern(in vec2 p, out vec2 q, out vec2 r) {
        q = vec2(
          sin(p.x + 0.05 * u_time) + cos(p.y + 0.07 * u_time),
          cos(p.x - 0.07 * u_time) + sin(p.y + 0.04 * u_time)
        );
        r = vec2(
          sin(p.x + q.x * 1.5 + 0.08 * u_time),
          cos(p.y + q.y * 1.5 + 0.06 * u_time)
        );
        return sin(p.x + r.x * 1.2 + 0.03 * u_time) * 0.5 + 0.5;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        
        p *= 1.5;
        
        vec2 q, r;
        float f = pattern(p, q, r);
        
        // Minimalist aesthetic colors
        // Light mode: elegant off-white, light cream, pale sand-grey
        vec3 lightA = vec3(0.97, 0.97, 0.95);
        vec3 lightB = vec3(0.93, 0.92, 0.89);
        vec3 lightC = vec3(0.88, 0.89, 0.86);
        
        // Dark mode: luxury deep rich blacks/charcoals
        vec3 darkA  = vec3(0.04, 0.04, 0.05);
        vec3 darkB  = vec3(0.08, 0.09, 0.10);
        vec3 darkC  = vec3(0.12, 0.12, 0.14);
        
        vec3 lightColor = mix(lightA, mix(lightB, lightC, f), r.x * 0.5 + 0.5);
        vec3 darkColor  = mix(darkA, mix(darkB, darkC, f), r.y * 0.5 + 0.5);
        
        vec3 finalColor = mix(lightColor, darkColor, u_theme);
        
        // Subtle design-focused analog print grain
        float grain = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
        finalColor += (grain - 0.5) * 0.015;
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    // Helper to compile shaders
    const compileShader = (source: string, type: number): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(vsSource, gl.VERTEX_SHADER);
    const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    // Create program
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program linking error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Full-screen quad geometry
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const resolutionLoc = gl.getUniformLocation(program, "u_resolution");
    const timeLoc = gl.getUniformLocation(program, "u_time");
    const themeLoc = gl.getUniformLocation(program, "u_theme");

    let animationFrameId: number;
    let startTime = Date.now();

    // Resize handler
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for performance
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    // Watch for size changes using ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    
    // Also attach resize to parent container just in case
    const parent = canvas.parentElement;
    if (parent) {
      resizeObserver.observe(parent);
    }
    
    handleResize();

    // Render loop
    const render = () => {
      const elapsedSeconds = (Date.now() - startTime) / 1000.0;

      // Smoothly interpolate themeValueRef.current towards target
      const targetTheme = isDarkMode ? 1.0 : 0.0;
      themeValueRef.current += (targetTheme - themeValueRef.current) * 0.08; // smooth transition speed

      // Set uniform values
      if (resolutionLoc) {
        gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
      }
      if (timeLoc) {
        gl.uniform1f(timeLoc, elapsedSeconds);
      }
      if (themeLoc) {
        gl.uniform1f(themeLoc, themeValueRef.current);
      }

      // Draw full screen quad
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      
      gl.deleteBuffer(vertexBuffer);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteProgram(program);
    };
  }, [isDarkMode]);

  return (
    <canvas
      id="webgl-bg-canvas"
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 block"
      style={{ mixBlendMode: "normal" }}
    />
  );
}
