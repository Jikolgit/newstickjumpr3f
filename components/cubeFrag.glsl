    uniform float utime;
    uniform vec3 ucolor;
    uniform vec3 uColor;
    varying vec2 vUv;

      void main() {
        // float bar = abs(vUv.x-0.5) ;
        // float strenght = distance(vUv,vec2(0.55));
        float strenght = (vUv.x*5.0) ;

        vec4 blueCol = vec4(1.0,0.0,0.0,1.0);
        vec4 mixedColor = mix(vec4(1.0,1.0,1.0,0.8),vec4(0.0,0.0,0.0,0.0),strenght);
        gl_FragColor.rgba = vec4(mixedColor);
        
        // gl_FragColor.rgba = vec4(mixedColor);
        // gl_FragColor.rgba = vec4(strenght,strenght,strenght, 1.0);
        
      }
      