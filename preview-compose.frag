uniform float slope;
uniform float discardEdge;
uniform vec4 keyColor;

uniform sampler2D colorTexture;
uniform sampler2D backgroundTexture;
uniform sampler2D frameTexture;

varying vec2 vUv;

void main( void ) {

	// Prepare textures
	vec4 frameColor = texture2D( frameTexture, vUv ).rgba;
	vec3 backColor = texture2D( backgroundTexture, vUv ).rgb;
	vec3 color = texture2D( colorTexture, vUv ).rgb;

	// Calculate tonemap
	float distance = abs(length(abs(keyColor.rgb - color)));

	float edge0 = discardEdge * (1.0 - slope);
	float tonemap = saturate(smoothstep(edge0, discardEdge, distance));

	float inversedTonemap = 1.0 - tonemap;

	vec3 background = backColor * inversedTonemap;
	vec3 video = color * tonemap;
	vec3 composedColor = ((background + video) * (1.0 - frameColor.a)) + (frameColor.rgb * frameColor.a);

	gl_FragColor = vec4( composedColor , 1.0 );
}