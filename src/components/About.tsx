import { Users } from "lucide-react";
import { DollarSign, Calendar, SquareArrowOutUpRight } from "lucide-react";

const About: React.FC = () => {
  return (
    <div className="bg-[#003B42] w-full font-poppins text-white pt-20">
      <hr className="w-full text-primary-100/60" />

      <div className="grid w-full h-auto md:h-[1488px] justify-between p-6 md:p-10">
        <div className="w-full md:w-[1573px] h-auto md:h-[1215px]">
          <div className="place-items-center md:ml-40">
            <h2 className="w-full md:w-[613px] h-auto md:h-[144px] text-center text-3xl sm:text-5xl md:text-7xl font-semibold mb-5 mt-10 capitalize">
              why aguka?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 w-full h-auto md:h-[1080px] gap-8 md:gap-[41px] relative md:ml-30">
            {/* Card 1 */}
            <div className="w-full md:w-[745px] h-auto md:h-[507px] border-[#D4D4D4] relative">
              <div className="absolute font-bold -top-10 -left-5 md:top-[-45px] md:-left-7">
                <h1 className="text-white text-2xl md:text-4xl p-4 md:p-7 rounded-full bg-[#F9A825]">
                  01
                </h1>
              </div>
              <div className="w-full md:w-[693px] rounded-[30px] border border-[#D4D4D4] bg-[#003B42] p-6 md:p-10">
                <div className="grid w-full md:w-[622px] gap-6 md:gap-[50px]">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl p-3 bg-gradient-to-b from-[#B0C2C4] to-[#545D5E] flex items-center justify-center">
                    <Users className="size-6 md:size-8 text-secondary-300 font-extrabold" />
                  </div>
                  <div className="grid gap-4 md:gap-[50px]">
                    <h3 className="text-lg sm:text-2xl md:text-[40px] text-[#FFFF] font-semibold">
                      From Your Circle
                    </h3>
                    <p className="font-medium md:font-semibold text-sm sm:text-base md:text-[24px] text-[#BABABA]">
                      Gather 5-20 trusted friends, family, or community members
                      to create your tontine circle.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="w-full md:w-[745px] h-auto md:h-[507px] border-[#D4D4D4] relative">
              <div className="absolute font-bold -top-10 -left-5 md:top-[-50px] md:-left-7">
                <h1 className="text-white text-2xl md:text-4xl p-4 md:p-7 rounded-full bg-[#F9A825]">
                  02
                </h1>
              </div>
              <div className="w-full md:w-[693px] rounded-[30px] border border-[#D4D4D4] bg-[#003B42] p-6 md:p-10">
                <div className="grid w-full md:w-[622px] gap-6 md:gap-[50px]">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl p-3 bg-gradient-to-b from-[#B0C2C4] to-[#545D5E] flex items-center justify-center">
                    <DollarSign className="size-6 md:size-8 text-secondary-300 font-extrabold" />
                  </div>
                  <div className="grid gap-4 md:gap-[50px]">
                    <h3 className="text-lg sm:text-2xl md:text-[40px] text-[#FFFF] font-semibold">
                      Set Contribution Schedule
                    </h3>
                    <p className="font-medium md:font-semibold text-sm sm:text-base md:text-[24px] text-[#BABABA]">
                      Decide on regular contribution amounts and frequency –
                      weekly, monthly, or custom intervals.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="w-full md:w-[745px] h-auto md:h-[507px] border-[#D4D4D4] relative">
              <div className="absolute font-bold -top-10 -left-5 md:top-[-50px] md:-left-7">
                <h1 className="text-white text-2xl md:text-4xl p-4 md:p-7 rounded-full bg-[#F9A825]">
                  03
                </h1>
              </div>
              <div className="w-full md:w-[693px] rounded-[30px] border border-[#D4D4D4] bg-[#003B42] p-6 md:p-10">
                <div className="grid w-full md:w-[622px] gap-6 md:gap-[50px]">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl p-3 bg-gradient-to-b from-[#B0C2C4] to-[#545D5E] flex items-center justify-center">
                    <Calendar className="size-6 md:size-8 text-secondary-300 font-extrabold" />
                  </div>
                  <div className="grid gap-4 md:gap-[50px]">
                    <h3 className="text-lg sm:text-2xl md:text-[40px] text-[#FFFF] font-semibold">
                      Take Turns Receiving
                    </h3>
                    <p className="font-medium md:font-semibold text-sm sm:text-base md:text-[24px] text-[#BABABA]">
                      Each member receives the full pot in rotation, creating
                      powerful savings momentum for everyone.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="w-full md:w-[745px] h-auto md:h-[507px] border-[#D4D4D4] relative">
              <div className="absolute font-bold -top-10 -left-5 md:top-[-50px] md:-left-7">
                <h1 className="text-white text-2xl md:text-4xl p-4 md:p-7 rounded-full bg-[#F9A825]">
                  04
                </h1>
              </div>
              <div className="w-full md:w-[693px] rounded-[30px] border border-[#D4D4D4] bg-[#003B42] p-6 md:p-10">
                <div className="grid w-full md:w-[622px] gap-6 md:gap-[50px]">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl p-3 bg-gradient-to-b from-[#B0C2C4] to-[#545D5E] flex items-center justify-center">
                    <SquareArrowOutUpRight className="size-6 md:size-8 text-secondary-300 font-extrabold" />
                  </div>
                  <div className="grid gap-4 md:gap-[50px]">
                    <h3 className="text-lg sm:text-2xl md:text-[40px] text-[#FFFF] font-semibold">
                      Build Wealth Together
                    </h3>
                    <p className="font-medium md:font-semibold text-sm sm:text-base md:text-[24px] text-[#BABABA]">
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
