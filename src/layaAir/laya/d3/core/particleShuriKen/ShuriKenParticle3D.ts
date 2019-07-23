import { Node } from "../../../display/Node";
import { Loader } from "../../../net/Loader";
import { Color } from "../../math/Color";
import { Vector2 } from "../../math/Vector2";
import { Vector3 } from "../../math/Vector3";
import { Vector4 } from "../../math/Vector4";
import { ShaderDefines } from "../../shader/ShaderDefines";
import { Gradient } from "../Gradient";
import { RenderElement } from "../render/RenderElement";
import { RenderableSprite3D } from "../RenderableSprite3D";
import { ShurikenParticleMaterial } from "./ShurikenParticleMaterial";
import { ShurikenParticleRenderer } from "./ShurikenParticleRenderer";
import { ShurikenParticleSystem } from "./ShurikenParticleSystem";
import { Burst } from "./module/Burst";
import { ColorOverLifetime } from "./module/ColorOverLifetime";
import { Emission } from "./module/Emission";
import { FrameOverTime } from "./module/FrameOverTime";
import { GradientAngularVelocity } from "./module/GradientAngularVelocity";
import { GradientColor } from "./module/GradientColor";
import { GradientDataInt } from "./module/GradientDataInt";
import { GradientDataNumber } from "./module/GradientDataNumber";
import { GradientSize } from "./module/GradientSize";
import { GradientVelocity } from "./module/GradientVelocity";
import { RotationOverLifetime } from "./module/RotationOverLifetime";
import { BaseShape } from "./module/shape/BaseShape";
import { BoxShape } from "./module/shape/BoxShape";
import { CircleShape } from "./module/shape/CircleShape";
import { ConeShape } from "./module/shape/ConeShape";
import { HemisphereShape } from "./module/shape/HemisphereShape";
import { SphereShape } from "./module/shape/SphereShape";
import { SizeOverLifetime } from "./module/SizeOverLifetime";
import { StartFrame } from "./module/StartFrame";
import { TextureSheetAnimation } from "./module/TextureSheetAnimation";
import { VelocityOverLifetime } from "./module/VelocityOverLifetime";
import { ShuriKenParticle3DShaderDeclaration } from "./ShuriKenParticle3DShaderDeclaration";

/**
 * <code>ShuriKenParticle3D</code> 3D粒子。
 */
export class ShuriKenParticle3D extends RenderableSprite3D {
	/**@internal */
	static shaderDefines: ShaderDefines;

	/**
	 * @internal
	 */
	static __init__(): void {
		ShuriKenParticle3D.shaderDefines = new ShaderDefines(RenderableSprite3D.shaderDefines);
		ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_RENDERMODE_BILLBOARD = ShuriKenParticle3D.shaderDefines.registerDefine("SPHERHBILLBOARD");
		ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_RENDERMODE_STRETCHEDBILLBOARD = ShuriKenParticle3D.shaderDefines.registerDefine("STRETCHEDBILLBOARD");
		ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_RENDERMODE_HORIZONTALBILLBOARD = ShuriKenParticle3D.shaderDefines.registerDefine("HORIZONTALBILLBOARD");
		ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_RENDERMODE_VERTICALBILLBOARD = ShuriKenParticle3D.shaderDefines.registerDefine("VERTICALBILLBOARD");

		ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_COLOROVERLIFETIME = ShuriKenParticle3D.shaderDefines.registerDefine("COLOROVERLIFETIME");
		ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_RANDOMCOLOROVERLIFETIME = ShuriKenParticle3D.shaderDefines.registerDefine("RANDOMCOLOROVERLIFETIME");
		ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_VELOCITYOVERLIFETIMECONSTANT = ShuriKenParticle3D.shaderDefines.registerDefine("VELOCITYOVERLIFETIMECONSTANT");
		ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_VELOCITYOVERLIFETIMECURVE = ShuriKenParticle3D.shaderDefines.registerDefine("VELOCITYOVERLIFETIMECURVE");
		ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_VELOCITYOVERLIFETIMERANDOMCONSTANT = ShuriKenParticle3D.shaderDefines.registerDefine("VELOCITYOVERLIFETIMERANDOMCONSTANT");
		ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_VELOCITYOVERLIFETIMERANDOMCURVE = ShuriKenParticle3D.shaderDefines.registerDefine("VELOCITYOVERLIFETIMERANDOMCURVE");
		ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_TEXTURESHEETANIMATIONCURVE = ShuriKenParticle3D.shaderDefines.registerDefine("TEXTURESHEETANIMATIONCURVE");
		ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_TEXTURESHEETANIMATIONRANDOMCURVE = ShuriKenParticle3D.shaderDefines.registerDefine("TEXTURESHEETANIMATIONRANDOMCURVE");
		ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_ROTATIONOVERLIFETIME = ShuriKenParticle3D.shaderDefines.registerDefine("ROTATIONOVERLIFETIME");
		ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_ROTATIONOVERLIFETIMESEPERATE = ShuriKenParticle3D.shaderDefines.registerDefine("ROTATIONOVERLIFETIMESEPERATE");
		ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_ROTATIONOVERLIFETIMECONSTANT = ShuriKenParticle3D.shaderDefines.registerDefine("ROTATIONOVERLIFETIMECONSTANT");
		ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_ROTATIONOVERLIFETIMECURVE = ShuriKenParticle3D.shaderDefines.registerDefine("ROTATIONOVERLIFETIMECURVE");
		ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_ROTATIONOVERLIFETIMERANDOMCONSTANTS = ShuriKenParticle3D.shaderDefines.registerDefine("ROTATIONOVERLIFETIMERANDOMCONSTANTS");
		ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_ROTATIONOVERLIFETIMERANDOMCURVES = ShuriKenParticle3D.shaderDefines.registerDefine("ROTATIONOVERLIFETIMERANDOMCURVES");
		ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_SIZEOVERLIFETIMECURVE = ShuriKenParticle3D.shaderDefines.registerDefine("SIZEOVERLIFETIMECURVE");
		ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_SIZEOVERLIFETIMECURVESEPERATE = ShuriKenParticle3D.shaderDefines.registerDefine("SIZEOVERLIFETIMECURVESEPERATE");
		ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_SIZEOVERLIFETIMERANDOMCURVES = ShuriKenParticle3D.shaderDefines.registerDefine("SIZEOVERLIFETIMERANDOMCURVES");
		ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_SIZEOVERLIFETIMERANDOMCURVESSEPERATE = ShuriKenParticle3D.shaderDefines.registerDefine("SIZEOVERLIFETIMERANDOMCURVESSEPERATE");
		ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_RENDERMODE_MESH = ShuriKenParticle3D.shaderDefines.registerDefine("RENDERMODE_MESH");
		ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_SHAPE = ShuriKenParticle3D.shaderDefines.registerDefine("SHAPE");
	}

	/** @internal */
	private _particleSystem: ShurikenParticleSystem;

	/**
	 * 获取粒子系统。
	 * @return  粒子系统。
	 */
	get particleSystem(): ShurikenParticleSystem {
		return this._particleSystem;
	}

	/**
	 * 获取粒子渲染器。
	 * @return  粒子渲染器。
	 */
	get particleRenderer(): ShurikenParticleRenderer {
		return (<ShurikenParticleRenderer>this._render);
	}

	/**
	 * 创建一个 <code>Particle3D</code> 实例。
	 * @param settings value 粒子配置。
	 */
	constructor() {
		super(null);
		this._render = new ShurikenParticleRenderer(this);

		this._particleSystem = new ShurikenParticleSystem(this);

		var elements: RenderElement[] = this._render._renderElements;
		var element: RenderElement = elements[0] = new RenderElement();
		element.setTransform(this._transform);
		element.render = this._render;
		element.setGeometry(this._particleSystem);
		element.material = ShurikenParticleMaterial.defaultMaterial;
	}

	/**
	 * @internal
	 */
	private static _initStartLife(gradientData: any): GradientDataNumber {
		var gradient: GradientDataNumber = new GradientDataNumber();
		var startLifetimesData: any[] = gradientData.startLifetimes;
		for (var i: number = 0, n: number = startLifetimesData.length; i < n; i++) {
			var valueData: any = startLifetimesData[i];
			gradient.add(valueData.key, valueData.value);
		}
		return gradient
	}

	/**
	 * @internal
	 */
	private _initParticleVelocity(gradientData: any): GradientDataNumber {
		var gradient: GradientDataNumber = new GradientDataNumber();
		var velocitysData: any[] = gradientData.velocitys;
		for (var i: number = 0, n: number = velocitysData.length; i < n; i++) {
			var valueData: any = velocitysData[i];
			gradient.add(valueData.key, valueData.value);
		}
		return gradient;
	}

	/**
	 * @internal
	 */
	private _initParticleColor(gradientColorData: any): Gradient {
		var gradientColor: Gradient = new Gradient(4, 4);
		var alphasData: any[] = gradientColorData.alphas;
		var i: number, n: number;
		for (i = 0, n = alphasData.length; i < n; i++) {
			var alphaData: any = alphasData[i];
			if ((i === 3) && ((alphaData.key !== 1))) {
				alphaData.key = 1;
				console.log("GradientDataColor warning:the forth key is  be force set to 1.");
			}
			gradientColor.addColorAlpha(alphaData.key, alphaData.value);
		}
		var rgbsData: any[] = gradientColorData.rgbs;
		for (i = 0, n = rgbsData.length; i < n; i++) {
			var rgbData: any = rgbsData[i];
			var rgbValue: any[] = rgbData.value;

			if ((i === 3) && ((rgbData.key !== 1))) {
				rgbData.key = 1;
				console.log("GradientDataColor warning:the forth key is  be force set to 1.");
			}
			gradientColor.addColorRGB(rgbData.key, new Color(rgbValue[0], rgbValue[1], rgbValue[2], 1.0));
		}
		return gradientColor;
	}

	/**
	 * @internal
	 */
	private _initParticleSize(gradientSizeData: any): GradientDataNumber {
		var gradientSize: GradientDataNumber = new GradientDataNumber();
		var sizesData: any[] = gradientSizeData.sizes;
		for (var i: number = 0, n: number = sizesData.length; i < n; i++) {
			var valueData: any = sizesData[i];
			gradientSize.add(valueData.key, valueData.value);
		}
		return gradientSize;
	}

	/**
	 * @internal
	 */
	private _initParticleRotation(gradientData: any): GradientDataNumber {
		var gradient: GradientDataNumber = new GradientDataNumber();
		var angularVelocitysData: any[] = gradientData.angularVelocitys;
		for (var i: number = 0, n: number = angularVelocitysData.length; i < n; i++) {
			var valueData: any = angularVelocitysData[i];
			gradient.add(valueData.key, valueData.value / 180.0 * Math.PI);
		}
		return gradient;
	}

	/**
	 * @internal
	 */
	private _initParticleFrame(overTimeFramesData: any): GradientDataInt {
		var overTimeFrame: GradientDataInt = new GradientDataInt();
		var framesData: any[] = overTimeFramesData.frames;
		for (var i: number = 0, n: number = framesData.length; i < n; i++) {
			var frameData: any = framesData[i];
			overTimeFrame.add(frameData.key, frameData.value);
		}
		return overTimeFrame;
	}

	/**
	 * @inheritDoc
	 * @override
	 */
	_parse(data: any, spriteMap: any): void {
		super._parse(data, spriteMap);
		const anglelToRad: number = Math.PI / 180.0;
		var i: number, n: number;

		//Render
		var particleRender: ShurikenParticleRenderer = this.particleRenderer;
		var material: ShurikenParticleMaterial;

		var materialData: any = data.material;
		(materialData) && (material = Loader.getRes(materialData.path));

		particleRender.sharedMaterial = material;
		var meshPath: string = data.meshPath;
		(meshPath) && (particleRender.mesh = Loader.getRes(meshPath));

		particleRender.renderMode = data.renderMode;
		particleRender.stretchedBillboardCameraSpeedScale = data.stretchedBillboardCameraSpeedScale;
		particleRender.stretchedBillboardSpeedScale = data.stretchedBillboardSpeedScale;
		particleRender.stretchedBillboardLengthScale = data.stretchedBillboardLengthScale;
		particleRender.sortingFudge = data.sortingFudge ? data.sortingFudge : 0.0;

		//particleSystem
		var particleSystem: ShurikenParticleSystem = this.particleSystem;
		particleSystem.isPerformanceMode = data.isPerformanceMode;

		particleSystem.duration = data.duration;
		particleSystem.looping = data.looping;
		particleSystem.prewarm = data.prewarm;

		particleSystem.startDelayType = data.startDelayType;
		particleSystem.startDelay = data.startDelay;
		particleSystem.startDelayMin = data.startDelayMin;
		particleSystem.startDelayMax = data.startDelayMax;

		particleSystem.startLifetimeType = data.startLifetimeType;
		particleSystem.startLifetimeConstant = data.startLifetimeConstant;
		particleSystem.startLifeTimeGradient = ShuriKenParticle3D._initStartLife(data.startLifetimeGradient);
		particleSystem.startLifetimeConstantMin = data.startLifetimeConstantMin;
		particleSystem.startLifetimeConstantMax = data.startLifetimeConstantMax;
		particleSystem.startLifeTimeGradientMin = ShuriKenParticle3D._initStartLife(data.startLifetimeGradientMin);
		particleSystem.startLifeTimeGradientMax = ShuriKenParticle3D._initStartLife(data.startLifetimeGradientMax);

		particleSystem.startSpeedType = data.startSpeedType;
		particleSystem.startSpeedConstant = data.startSpeedConstant;
		particleSystem.startSpeedConstantMin = data.startSpeedConstantMin;
		particleSystem.startSpeedConstantMax = data.startSpeedConstantMax;

		particleSystem.threeDStartSize = data.threeDStartSize;
		particleSystem.startSizeType = data.startSizeType;
		particleSystem.startSizeConstant = data.startSizeConstant;
		var startSizeConstantSeparateArray: any[] = data.startSizeConstantSeparate;
		var startSizeConstantSeparateElement: Vector3 = particleSystem.startSizeConstantSeparate;
		startSizeConstantSeparateElement.x = startSizeConstantSeparateArray[0];
		startSizeConstantSeparateElement.y = startSizeConstantSeparateArray[1];
		startSizeConstantSeparateElement.z = startSizeConstantSeparateArray[2];
		particleSystem.startSizeConstantMin = data.startSizeConstantMin;
		particleSystem.startSizeConstantMax = data.startSizeConstantMax;
		var startSizeConstantMinSeparateArray: any[] = data.startSizeConstantMinSeparate;
		var startSizeConstantMinSeparateElement: Vector3 = particleSystem.startSizeConstantMinSeparate;
		startSizeConstantMinSeparateElement.x = startSizeConstantMinSeparateArray[0];
		startSizeConstantMinSeparateElement.y = startSizeConstantMinSeparateArray[1];
		startSizeConstantMinSeparateElement.z = startSizeConstantMinSeparateArray[2];
		var startSizeConstantMaxSeparateArray: any[] = data.startSizeConstantMaxSeparate;
		var startSizeConstantMaxSeparateElement: Vector3 = particleSystem.startSizeConstantMaxSeparate;
		startSizeConstantMaxSeparateElement.x = startSizeConstantMaxSeparateArray[0];
		startSizeConstantMaxSeparateElement.y = startSizeConstantMaxSeparateArray[1];
		startSizeConstantMaxSeparateElement.z = startSizeConstantMaxSeparateArray[2];

		particleSystem.threeDStartRotation = data.threeDStartRotation;
		particleSystem.startRotationType = data.startRotationType;
		particleSystem.startRotationConstant = data.startRotationConstant * anglelToRad;
		var startRotationConstantSeparateArray: any[] = data.startRotationConstantSeparate;
		var startRotationConstantSeparateElement: Vector3 = particleSystem.startRotationConstantSeparate;
		startRotationConstantSeparateElement.x = startRotationConstantSeparateArray[0] * anglelToRad;
		startRotationConstantSeparateElement.y = startRotationConstantSeparateArray[1] * anglelToRad;
		startRotationConstantSeparateElement.z = startRotationConstantSeparateArray[2] * anglelToRad;
		particleSystem.startRotationConstantMin = data.startRotationConstantMin * anglelToRad;
		particleSystem.startRotationConstantMax = data.startRotationConstantMax * anglelToRad;
		var startRotationConstantMinSeparateArray: any[] = data.startRotationConstantMinSeparate;
		var startRotationConstantMinSeparateElement: Vector3 = particleSystem.startRotationConstantMinSeparate;
		startRotationConstantMinSeparateElement.x = startRotationConstantMinSeparateArray[0] * anglelToRad;
		startRotationConstantMinSeparateElement.y = startRotationConstantMinSeparateArray[1] * anglelToRad;
		startRotationConstantMinSeparateElement.z = startRotationConstantMinSeparateArray[2] * anglelToRad;
		var startRotationConstantMaxSeparateArray: any[] = data.startRotationConstantMaxSeparate;
		var startRotationConstantMaxSeparateElement: Vector3 = particleSystem.startRotationConstantMaxSeparate;
		startRotationConstantMaxSeparateElement.x = startRotationConstantMaxSeparateArray[0] * anglelToRad;
		startRotationConstantMaxSeparateElement.y = startRotationConstantMaxSeparateArray[1] * anglelToRad;
		startRotationConstantMaxSeparateElement.z = startRotationConstantMaxSeparateArray[2] * anglelToRad;

		particleSystem.randomizeRotationDirection = data.randomizeRotationDirection;

		particleSystem.startColorType = data.startColorType;
		var startColorConstantArray: any[] = data.startColorConstant;
		var startColorConstantElement: Vector4 = particleSystem.startColorConstant;
		startColorConstantElement.x = startColorConstantArray[0];
		startColorConstantElement.y = startColorConstantArray[1];
		startColorConstantElement.z = startColorConstantArray[2];
		startColorConstantElement.w = startColorConstantArray[3];
		var startColorConstantMinArray: any[] = data.startColorConstantMin;
		var startColorConstantMinElement: Vector4 = particleSystem.startColorConstantMin;
		startColorConstantMinElement.x = startColorConstantMinArray[0];
		startColorConstantMinElement.y = startColorConstantMinArray[1];
		startColorConstantMinElement.z = startColorConstantMinArray[2];
		startColorConstantMinElement.w = startColorConstantMinArray[3];
		var startColorConstantMaxArray: any[] = data.startColorConstantMax;
		var startColorConstantMaxElement: Vector4 = particleSystem.startColorConstantMax;
		startColorConstantMaxElement.x = startColorConstantMaxArray[0];
		startColorConstantMaxElement.y = startColorConstantMaxArray[1];
		startColorConstantMaxElement.z = startColorConstantMaxArray[2];
		startColorConstantMaxElement.w = startColorConstantMaxArray[3];

		particleSystem.gravityModifier = data.gravityModifier;

		particleSystem.simulationSpace = data.simulationSpace;

		particleSystem.scaleMode = data.scaleMode;

		particleSystem.playOnAwake = data.playOnAwake;
		particleSystem.maxParticles = data.maxParticles;

		var autoRandomSeed: any = data.autoRandomSeed;
		(autoRandomSeed != null) && (particleSystem.autoRandomSeed = autoRandomSeed);
		var randomSeed: any = data.randomSeed;
		(randomSeed != null) && (particleSystem.randomSeed[0] = randomSeed);

		//Emission
		var emissionData: any = data.emission;
		var emission: Emission = particleSystem.emission;
		if (emissionData) {
			emission.emissionRate = emissionData.emissionRate;
			var burstsData: any[] = emissionData.bursts;
			if (burstsData)
				for (i = 0, n = burstsData.length; i < n; i++) {
					var brust: any = burstsData[i];
					emission.addBurst(new Burst(brust.time, brust.min, brust.max));
				}
			emission.enbale = emissionData.enable;
		} else {
			emission.enbale = false;
		}

		//Shape
		var shapeData: any = data.shape;
		if (shapeData) {
			var shape: BaseShape;
			switch (shapeData.shapeType) {
				case 0:
					var sphereShape: SphereShape;
					shape = sphereShape = new SphereShape();
					sphereShape.radius = shapeData.sphereRadius;
					sphereShape.emitFromShell = shapeData.sphereEmitFromShell;
					sphereShape.randomDirection = shapeData.sphereRandomDirection;
					break;
				case 1:
					var hemiSphereShape: HemisphereShape;
					shape = hemiSphereShape = new HemisphereShape();
					hemiSphereShape.radius = shapeData.hemiSphereRadius;
					hemiSphereShape.emitFromShell = shapeData.hemiSphereEmitFromShell;
					hemiSphereShape.randomDirection = shapeData.hemiSphereRandomDirection;
					break;
				case 2:
					var coneShape: ConeShape;
					shape = coneShape = new ConeShape();
					coneShape.angle = shapeData.coneAngle * anglelToRad;
					coneShape.radius = shapeData.coneRadius;
					coneShape.length = shapeData.coneLength;
					coneShape.emitType = shapeData.coneEmitType;
					coneShape.randomDirection = shapeData.coneRandomDirection;
					break;
				case 3:
					var boxShape: BoxShape;
					shape = boxShape = new BoxShape();
					boxShape.x = shapeData.boxX;
					boxShape.y = shapeData.boxY;
					boxShape.z = shapeData.boxZ;
					boxShape.randomDirection = shapeData.boxRandomDirection;
					break;
				case 7:
					var circleShape: CircleShape;
					shape = circleShape = new CircleShape();
					circleShape.radius = shapeData.circleRadius;
					circleShape.arc = shapeData.circleArc * anglelToRad;
					circleShape.emitFromEdge = shapeData.circleEmitFromEdge;
					circleShape.randomDirection = shapeData.circleRandomDirection;
					break;
				/**
				 * ------------------------临时调整，待日后完善-------------------------------------
				 */
				default:
					var tempShape: CircleShape;
					shape = tempShape = new CircleShape();
					tempShape.radius = shapeData.circleRadius;
					tempShape.arc = shapeData.circleArc * anglelToRad;
					tempShape.emitFromEdge = shapeData.circleEmitFromEdge;
					tempShape.randomDirection = shapeData.circleRandomDirection;
					break;
			}
			shape.enable = shapeData.enable;
			particleSystem.shape = shape;
		}

		//VelocityOverLifetime
		var velocityOverLifetimeData: any = data.velocityOverLifetime;
		if (velocityOverLifetimeData) {
			var velocityData: any = velocityOverLifetimeData.velocity;
			var velocity: GradientVelocity;
			switch (velocityData.type) {
				case 0:
					var constantData: any[] = velocityData.constant;
					velocity = GradientVelocity.createByConstant(new Vector3(constantData[0], constantData[1], constantData[2]));
					break;
				case 1:
					velocity = GradientVelocity.createByGradient(this._initParticleVelocity(velocityData.gradientX), this._initParticleVelocity(velocityData.gradientY), this._initParticleVelocity(velocityData.gradientZ));
					break;
				case 2:
					var constantMinData: any[] = velocityData.constantMin;
					var constantMaxData: any[] = velocityData.constantMax;
					velocity = GradientVelocity.createByRandomTwoConstant(new Vector3(constantMinData[0], constantMinData[1], constantMinData[2]), new Vector3(constantMaxData[0], constantMaxData[1], constantMaxData[2]));
					break;
				case 3:
					velocity = GradientVelocity.createByRandomTwoGradient(this._initParticleVelocity(velocityData.gradientXMin), this._initParticleVelocity(velocityData.gradientXMax), this._initParticleVelocity(velocityData.gradientYMin), this._initParticleVelocity(velocityData.gradientYMax), this._initParticleVelocity(velocityData.gradientZMin), this._initParticleVelocity(velocityData.gradientZMax));
					break;
			}
			var velocityOverLifetime: VelocityOverLifetime = new VelocityOverLifetime(velocity);
			velocityOverLifetime.space = velocityOverLifetimeData.space;
			velocityOverLifetime.enbale = velocityOverLifetimeData.enable;
			particleSystem.velocityOverLifetime = velocityOverLifetime;
		}

		//ColorOverLifetime
		var colorOverLifetimeData: any = data.colorOverLifetime;
		if (colorOverLifetimeData) {
			var colorData: any = colorOverLifetimeData.color;
			var color: GradientColor;
			switch (colorData.type) {
				case 0:
					var constColorData: any[] = colorData.constant;
					color = GradientColor.createByConstant(new Vector4(constColorData[0], constColorData[1], constColorData[2], constColorData[3]));
					break;
				case 1:
					color = GradientColor.createByGradient(this._initParticleColor(colorData.gradient));
					break;
				case 2:
					var minConstColorData: any[] = colorData.constantMin;
					var maxConstColorData: any[] = colorData.constantMax;
					color = GradientColor.createByRandomTwoConstant(new Vector4(minConstColorData[0], minConstColorData[1], minConstColorData[2], minConstColorData[3]), new Vector4(maxConstColorData[0], maxConstColorData[1], maxConstColorData[2], maxConstColorData[3]));
					break;
				case 3:
					color = GradientColor.createByRandomTwoGradient(this._initParticleColor(colorData.gradientMin), this._initParticleColor(colorData.gradientMax));
					break;
			}
			var colorOverLifetime: ColorOverLifetime = new ColorOverLifetime(color);
			colorOverLifetime.enbale = colorOverLifetimeData.enable;
			particleSystem.colorOverLifetime = colorOverLifetime;
		}

		//SizeOverLifetime
		var sizeOverLifetimeData: any = data.sizeOverLifetime;
		if (sizeOverLifetimeData) {
			var sizeData: any = sizeOverLifetimeData.size;
			var size: GradientSize;
			switch (sizeData.type) {
				case 0:
					if (sizeData.separateAxes) {
						size = GradientSize.createByGradientSeparate(this._initParticleSize(sizeData.gradientX), this._initParticleSize(sizeData.gradientY), this._initParticleSize(sizeData.gradientZ));
					} else {
						size = GradientSize.createByGradient(this._initParticleSize(sizeData.gradient));
					}
					break;
				case 1:
					if (sizeData.separateAxes) {
						var constantMinSeparateData: any[] = sizeData.constantMinSeparate;
						var constantMaxSeparateData: any[] = sizeData.constantMaxSeparate;
						size = GradientSize.createByRandomTwoConstantSeparate(new Vector3(constantMinSeparateData[0], constantMinSeparateData[1], constantMinSeparateData[2]), new Vector3(constantMaxSeparateData[0], constantMaxSeparateData[1], constantMaxSeparateData[2]));
					} else {
						size = GradientSize.createByRandomTwoConstant(sizeData.constantMin, sizeData.constantMax);
					}
					break;
				case 2:
					if (sizeData.separateAxes) {
						size = GradientSize.createByRandomTwoGradientSeparate(this._initParticleSize(sizeData.gradientXMin), this._initParticleSize(sizeData.gradientYMin), this._initParticleSize(sizeData.gradientZMin), this._initParticleSize(sizeData.gradientXMax), this._initParticleSize(sizeData.gradientYMax), this._initParticleSize(sizeData.gradientZMax));
					} else {
						size = GradientSize.createByRandomTwoGradient(this._initParticleSize(sizeData.gradientMin), this._initParticleSize(sizeData.gradientMax));
					}
					break;
			}
			var sizeOverLifetime: SizeOverLifetime = new SizeOverLifetime(size);
			sizeOverLifetime.enbale = sizeOverLifetimeData.enable;
			particleSystem.sizeOverLifetime = sizeOverLifetime;
		}

		//RotationOverLifetime
		var rotationOverLifetimeData: any = data.rotationOverLifetime;
		if (rotationOverLifetimeData) {
			var angularVelocityData: any = rotationOverLifetimeData.angularVelocity;
			var angularVelocity: GradientAngularVelocity;
			switch (angularVelocityData.type) {
				case 0:
					if (angularVelocityData.separateAxes) {
						var conSep: any[] = angularVelocityData.constantSeparate;
						angularVelocity = GradientAngularVelocity.createByConstantSeparate(new Vector3(conSep[0] * anglelToRad, conSep[1] * anglelToRad, conSep[2] * anglelToRad));
					} else {
						angularVelocity = GradientAngularVelocity.createByConstant(angularVelocityData.constant * anglelToRad);
					}
					break;
				case 1:
					if (angularVelocityData.separateAxes) {
						angularVelocity = GradientAngularVelocity.createByGradientSeparate(this._initParticleRotation(angularVelocityData.gradientX), this._initParticleRotation(angularVelocityData.gradientY), this._initParticleRotation(angularVelocityData.gradientZ));
					} else {
						angularVelocity = GradientAngularVelocity.createByGradient(this._initParticleRotation(angularVelocityData.gradient));
					}
					break;
				case 2:
					if (angularVelocityData.separateAxes) {
						var minSep: any[] = angularVelocityData.constantMinSeparate;//TODO:Y是否要取负数
						var maxSep: any[] = angularVelocityData.constantMaxSeparate;//TODO:Y是否要取负数
						angularVelocity = GradientAngularVelocity.createByRandomTwoConstantSeparate(new Vector3(minSep[0] * anglelToRad, minSep[1] * anglelToRad, minSep[2] * anglelToRad), new Vector3(maxSep[0] * anglelToRad, maxSep[1] * anglelToRad, maxSep[2] * anglelToRad));
					} else {
						angularVelocity = GradientAngularVelocity.createByRandomTwoConstant(angularVelocityData.constantMin * anglelToRad, angularVelocityData.constantMax * anglelToRad);
					}
					break;
				case 3:
					if (angularVelocityData.separateAxes) {
						//TODO:待补充
					} else {
						angularVelocity = GradientAngularVelocity.createByRandomTwoGradient(this._initParticleRotation(angularVelocityData.gradientMin), this._initParticleRotation(angularVelocityData.gradientMax));
					}
					break;
			}
			var rotationOverLifetime: RotationOverLifetime = new RotationOverLifetime(angularVelocity);
			rotationOverLifetime.enbale = rotationOverLifetimeData.enable;
			particleSystem.rotationOverLifetime = rotationOverLifetime;
		}

		//TextureSheetAnimation
		var textureSheetAnimationData: any = data.textureSheetAnimation;
		if (textureSheetAnimationData) {
			var frameData: any = textureSheetAnimationData.frame;
			var frameOverTime: FrameOverTime;
			switch (frameData.type) {
				case 0:
					frameOverTime = FrameOverTime.createByConstant(frameData.constant);
					break;
				case 1:
					frameOverTime = FrameOverTime.createByOverTime(this._initParticleFrame(frameData.overTime));
					break;
				case 2:
					frameOverTime = FrameOverTime.createByRandomTwoConstant(frameData.constantMin, frameData.constantMax);
					break;
				case 3:
					frameOverTime = FrameOverTime.createByRandomTwoOverTime(this._initParticleFrame(frameData.overTimeMin), this._initParticleFrame(frameData.overTimeMax));
					break;
			}
			var startFrameData: any = textureSheetAnimationData.startFrame;
			var startFrame: StartFrame;
			switch (startFrameData.type) {
				case 0:
					startFrame = StartFrame.createByConstant(startFrameData.constant);
					break;
				case 1:
					startFrame = StartFrame.createByRandomTwoConstant(startFrameData.constantMin, startFrameData.constantMax);
					break;
			}
			var textureSheetAnimation: TextureSheetAnimation = new TextureSheetAnimation(frameOverTime, startFrame);
			textureSheetAnimation.enable = textureSheetAnimationData.enable;
			var tilesData: any[] = textureSheetAnimationData.tiles;
			textureSheetAnimation.tiles = new Vector2(tilesData[0], tilesData[1]);
			textureSheetAnimation.type = textureSheetAnimationData.type;
			textureSheetAnimation.randomRow = textureSheetAnimationData.randomRow;
			var rowIndex: any = textureSheetAnimationData.rowIndex;
			(rowIndex !== undefined) && (textureSheetAnimation.rowIndex = rowIndex);
			textureSheetAnimation.cycles = textureSheetAnimationData.cycles;
			particleSystem.textureSheetAnimation = textureSheetAnimation;
		}
	}

	/**
	 * @inheritDoc
	 * @override
	 */
	_activeHierarchy(activeChangeComponents: any[]): void {
		super._activeHierarchy(activeChangeComponents);
		(this.particleSystem.playOnAwake) && (this.particleSystem.play());
	}

	/**
	 * @inheritDoc
	 * @override
	 */
	_inActiveHierarchy(activeChangeComponents: any[]): void {
		super._inActiveHierarchy(activeChangeComponents);
		(this.particleSystem.isAlive) && (this.particleSystem.simulate(0, true));
	}

	/**
	 * @internal
	 * @override
	 */
	_cloneTo(destObject: any, srcSprite: Node, dstSprite: Node): void {
		var destShuriKenParticle3D: ShuriKenParticle3D = (<ShuriKenParticle3D>destObject);
		var destParticleSystem: ShurikenParticleSystem = destShuriKenParticle3D._particleSystem;
		this._particleSystem.cloneTo(destParticleSystem);
		var destParticleRender: ShurikenParticleRenderer = (<ShurikenParticleRenderer>destShuriKenParticle3D._render);
		var particleRender: ShurikenParticleRenderer = (<ShurikenParticleRenderer>this._render);
		destParticleRender.sharedMaterials = particleRender.sharedMaterials;
		destParticleRender.enable = particleRender.enable;
		destParticleRender.renderMode = particleRender.renderMode;
		destParticleRender.mesh = particleRender.mesh;
		destParticleRender.stretchedBillboardCameraSpeedScale = particleRender.stretchedBillboardCameraSpeedScale;
		destParticleRender.stretchedBillboardSpeedScale = particleRender.stretchedBillboardSpeedScale;
		destParticleRender.stretchedBillboardLengthScale = particleRender.stretchedBillboardLengthScale;
		destParticleRender.sortingFudge = particleRender.sortingFudge;
		super._cloneTo(destObject, srcSprite, dstSprite);//父类函数在最后,组件应该最后赋值，否则获取材质默认值等相关函数会有问题
	}

	/**
	 * <p>销毁此对象。</p>
	 * @param	destroyChild 是否同时销毁子节点，若值为true,则销毁子节点，否则不销毁子节点。
	 * @override
	 */
	destroy(destroyChild: boolean = true): void {
		if (this.destroyed)
			return;
		super.destroy(destroyChild);
		this._particleSystem.destroy();
		this._particleSystem = null;
	}

	/**
	 * @internal
	 */
	protected _create(): Node {
		return new ShuriKenParticle3D();
	}

}


