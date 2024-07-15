    uniform float utime;
    uniform vec3 ucolor;
    uniform vec3 uColor;
    varying vec2 vUv;

      void main() {
        float bar = abs(vUv.x-0.5) ;
        // float strenght = distance(vUv,vec2(0.55));
        float strenght = step(0.7,mod((utime/2.5)-vUv.x*4.0,1.0));
        float transparentcy = 1.0;
        if(strenght == 0.0)
        {
          transparentcy = 0.0;
        }
        else
        {
          transparentcy = 0.7;
        }
        vec4 blueCol = vec4(uColor,0.8);
        vec4 mixedColor = mix(vec4(0.0,0.0,0.0,0.0),blueCol,strenght);
        // gl_FragColor.rgba = vec4(1.0,0.0,0.0, 1.0);
        gl_FragColor.rgba = vec4(mixedColor);
        // gl_FragColor.rgba = vec4(strenght,strenght,strenght, 1.0);
        
      }
      