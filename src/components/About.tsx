import { Users } from "lucide-react";
import { DollarSign, Calendar, SquareArrowOutUpRight } from "lucide-react";

const About: React.FC = () => {
  return (
    <div className="bg-[#003B42] w-full font-poppins text-white pt-20">
      <hr className=" w-full text-primary-100/60 " />

      <div className="grid w-full h-[1488px] justify-between  top-[2391px] left-[-1px] p-10 ">
        <div className="w-[1573px] h-[1215px]   ">
          <div className="place-items-center ml-40">
            <h2 className=" w-[613px] h-[144px] text-center text-7xl font-semibold mb-5 mt-10 capitalize">
              why aguka?
            </h2>
          </div>

          <div className="grid grid-cols-2 w-full h-[1080px] gap-[41px] relative ml-30">
            {/* Card 1 */}
            <div className="w-[745px] h-[507px] border-[#D4D4D4]">
              <div className="absolute font-bold top-[-45px] -left-7">
                <h1 className=" text-white text-4xl  p-7 rounded-full bg-[#F9A825]">
                  01
                </h1>
              </div>
              <div className="w-[693px] rounded-[30px] border border-[#D4D4D4] bg-[#003B42] p-10">
                <div className=" grid w-[622px] h-[360px] gap-[50px]">
                  <div className="w-20 h-20 rounded-2xl p-3  bg-gradient-to-b from-[#B0C2C4] to-[#545D5E] place-items-center">
                    <Users className="size-8 mt-2 text-secondary-300 font-extrabold" />
                  </div>
                  <div className="w-[622px] h-[169px] grid gap-[50px]">
                    <h3 className="w-[622px] h-[47px text-[#FFFF] text-[40px] ">
                      From Your Circle
                    </h3>
                    <p className="w-[622px] h-[72px] font-semibold text-[24px] text-[#BABABA] ">
                      Gather 5-20 trusted friends, family, or community members
                      to create your tontine circle.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="w-[745px] h-[507px] border-[#D4D4D4] relative">
              <div className="absolute font-bold top-[-50px] -left-7">
                <h1 className=" text-white text-4xl  p-7 rounded-full bg-[#F9A825]">
                  02
                </h1>
              </div>
              <div className="w-[693px] rounded-[30px] border border-[#D4D4D4] bg-[#003B42] p-10">
                <div className=" grid w-[622px] h-[360px] gap-[50px]">
                  <div className="w-20 h-20 rounded-2xl p-3  bg-gradient-to-b from-[#B0C2C4] to-[#545D5E] place-items-center">
                    <DollarSign className="size-8 mt-2 text-secondary-300 font-extrabold" />
                  </div>
                  <div className="w-[622px] h-[169px] grid gap-[50px]">
                    <h3 className="w-[622px] h-[47px text-[#FFFF] text-[40px] ">
                      Set Contribution Schedule
                    </h3>
                    <p className="w-[622px] h-[72px] font-semibold text-[24px] text-[#BABABA] ">
                      Decide on regular contribution amounts and frequency -
                      weekly, monthly, or custom intervals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Card 3 */}
            <div className="w-[745px] h-[507px] border-[#D4D4D4] relative">
              <div className="absolute font-bold top-[-50px] -left-7">
                <h1 className=" text-white text-4xl  p-7 rounded-full bg-[#F9A825]">
                  03
                </h1>
              </div>
              <div className="w-[693px] rounded-[30px] border border-[#D4D4D4] bg-[#003B42] p-10">
                <div className=" grid w-[622px] h-[360px] gap-[50px]">
                  <div className="w-20 h-20 rounded-2xl p-3  bg-gradient-to-b from-[#B0C2C4] to-[#545D5E] place-items-center">
                    <Calendar className="size-8 mt-2 text-secondary-300 font-extrabold" />
                  </div>
                  <div className="w-[622px] h-[169px] grid gap-[50px]">
                    <h3 className="w-[622px] h-[47px text-[#FFFF] text-[40px] ">
                      Take Turns Receiving
                    </h3>
                    <p className="w-[622px] h-[72px] font-semibold text-[24px] text-[#BABABA] ">
                      Each member receives the full pot in rotation, creating
                      powerful savings momentum for everyone.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="w-[745px] h-[507px] border-[#D4D4D4] relative">
              <div className="absolute font-bold top-[-50px] -left-7">
                <h1 className=" text-white text-4xl  p-7 rounded-full bg-[#F9A825]">
                  04
                </h1>
              </div>
              <div className="w-[693px] rounded-[30px] border border-[#D4D4D4] bg-[#003B42] p-10">
                <div className=" grid w-[622px] h-[360px] gap-[50px]">
                  <div className="w-20 h-20 rounded-2xl p-3  bg-gradient-to-b from-[#B0C2C4] to-[#545D5E] place-items-center">
                    <SquareArrowOutUpRight className="size-8 mt-2 text-secondary-300 font-extrabold" />
                  </div>
                  <div className="w-[622px] h-[169px] grid gap-[50px]">
                    <h3 className="w-[622px] h-[47px text-[#FFFF] text-[40px] ">
                      Build Wealth Together
                    </h3>
                    <p className="w-[622px] h-[72px] font-semibold text-[24px] text-[#BABABA] ">
                      Watch your financial goals become achievable through the
                      power of collective savings and accountability.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
