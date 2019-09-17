uniform float slope;
uniform float discardEdge;
uniform vec4 keyColor;

uniform sampler2D colorTexture;
uniform sampler2D backgroundTexture;

varying vec2 vUv;

void main( void ) {

	// Prepare textures
	vec3 backColor = texture2D( backgroundTexture, vUv ).rgb;
	vec3 color = texture2D( colorTexture, vUv ).rgb;

	// Calculate tonemap
	float distance = abs(length(abs(keyColor.rgb - color)));

	float edge0 = discardEdge * (1.0 - slope);
	float tonemap = saturate(smoothstep(edge0, discardEdge, distance));

	float inversedTonemap = 1.0 - tonemap;

	vec3 background = backColor * inversedTonemap;
	vec3 video = color * tonemap;

	gl_FragColor = vec4( background + video , 1.0 );
}