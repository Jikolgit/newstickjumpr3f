varying vec2 vUv;
  // uniform float utime;
      void main() {
        vUv = uv;
        vec4 modelPosition = modelViewMatrix * vec4(position.x,position.y,position.z, 1.0);
        // modelPosition.y += sin((modelPosition.x * 1.0)+utime);
        // modelPosition.z -= sin((modelPosition.x * 1.0)+utime);
        gl_Position = projectionMatrix * modelPosition;
      }