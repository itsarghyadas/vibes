import { BorderBeam } from "./border-beam";
import "./particle.css";

interface ParticlesProps {
  amount: number;
  minSpeed: number;
  maxSpeed: number;
  color: string;
  minSize: number;
  maxSize: number;
}

const Particles: React.FC<ParticlesProps> = ({
  amount,
  minSpeed,
  maxSpeed,
  color,
  minSize,
  maxSize,
}) => {
  return (
    <div className="w-full h-full pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 [transform:translateZ(0)_translate(-50%,-50%);] [mask-image:radial-gradient(50%_50%_at_50%_50%,rgba(217,217,217,0)_27.08%,#d9d9d9_47.92%,rgba(217,217,217,.8)_75%,rgba(217,217,217,0)_100%)] [mask-position:0,0] [mask-size:cover] particlecontainer -z-[1]">
      {[...Array(amount)].map((_, index) => {
        const animationDuration =
          Math.random() * (maxSpeed - minSpeed) + minSpeed;
        const animationDelay = Math.random() * 5;
        const yPercentage = Math.random();
        const xPercentage = Math.random();
        const vShape = Math.abs(xPercentage - 0.5) * 2;
        const yAdjusted = yPercentage * (1 + vShape);

        const left = xPercentage * 100;
        const bottom = yAdjusted * 100;

        const transformY = -(Math.random() * 100 + 100);
        const size = Math.random() * (maxSize - minSize) + minSize;

        return (
          <div
            key={index}
            className="bg-white rounded-[5px] h-0.5 w-0.5 absolute [transform:translateZ(0)_translate(-50%,-50%);] animate-float"
            style={
              {
                left: `${left}%`,
                bottom: `${bottom}%`,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color,
                animationDuration: `${animationDuration}s`,
                animationDelay: `${animationDelay}s`,
                "--transform": `translateY(${transformY}%)`,
              } as React.CSSProperties
            }
          ></div>
        );
      })}
    </div>
  );
};

function ParticlePreview() {
  return (
    <div className=" min-h-screen w-full items-center justify-center flex bg-neutral-900">
      <div className="max-w-5xl mx-auto w-full flex flex-col gap-y-10 items-center justify-center px-7 xl:px-0">
        <div className="text-center flex flex-col gap-y-5 max-w-2xl mx-auto">
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-balance">
            The composable visual editor for elite marketing teams
          </h2>
          <p className="text-neutral-300 text-balance text-base lg:text-lg">
            Makeswift puts marketers in the drivers' seat. Visually create and
            update enterprise-grade web experiences without the steep learning
            curve.
          </p>
        </div>
        <div className="max-w-5xl mx-auto w-full relative z-[1] flex flex-col gap-y-10 items-center justify-center ">
          <div className="relative before:absolute before:inset-3 before:-z-20 before:rounded-md before:bg-[#EA3BA7]/50 before:blur-3xl lg:before:inset-4 lg:before:blur-3xl before:transition-opacity before:opacity-75 ">
            <div className="h-full w-full">
              <div className="group relative z-0 h-full w-full overflow-hidden rounded-[32px] p-[1px] ring-1 ring-[#F59DD3]/30 bg-gradient-to-b from-[#EA3BA7]/25 to-[#07090D]/50">
                <BorderBeam size={250} duration={12} delay={9} />
                <div className="bg-purple-900/10 p-2 w-full h-full">
                  <div className="overflow-hidden rounded-3xl h-full w-full">
                    <img
                      src="https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                      className="object-cover rounded-xl shadow-xl w-[640px] h-96 "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Particles
            amount={500}
            minSpeed={5}
            maxSpeed={25}
            color="#f19fd875"
            minSize={1}
            maxSize={3}
          />
        </div>
      </div>
    </div>
  );
}

export default ParticlePreview;
