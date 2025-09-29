import { Users, DollarSign } from "lucide-react";

const KeyMetrics: React.FC = () => {
  return (
    <div className="w-full bg-[rgba(0,59,66,1)] text-white py-20 px-6 sm:px-12 md:px-[110px] font-poppins">
      <h2 className="text-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-12">
        Key Metrics
      </h2>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
        {/* Card 1 */}
        <div className="bg-[#006C77] rounded-md p-10 flex flex-col items-center justify-center">
          <Users className="size-16 sm:size-20 mb-6 text-secondary-300" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black">
            10,000+
          </h2>
          <span className="mt-2 text-lg sm:text-xl">active members</span>
        </div>

        {/* Card 2 */}
        <div className="bg-[#006C77] rounded-md p-10 flex flex-col items-center justify-center">
          <DollarSign className="size-16 sm:size-20 mb-6 text-secondary-300" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase">
            $50m+
          </h2>
          <span className="mt-2 text-lg sm:text-xl">funds calculated</span>
        </div>

        {/* Card 3 */}
        <div className="bg-[#006C77] rounded-md p-10 flex flex-col items-center justify-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-secondary-300">
            98%
          </h2>
          <span className="mt-2 text-lg sm:text-xl">success rate</span>
        </div>

        {/* Card 4 */}
        <div className="bg-[#006C77] rounded-md p-10 flex flex-col items-center justify-center">
          <Users className="size-16 sm:size-20 mb-6 text-secondary-300" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase">
            10,000+
          </h2>
          <span className="mt-2 text-lg sm:text-xl">active members</span>
        </div>

        {/* Card 5 */}
        <div className="bg-[#006C77] rounded-md p-10 flex flex-col items-center justify-center">
          <DollarSign className="size-16 sm:size-20 mb-6 text-secondary-300" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase">
            $1m+
          </h2>
          <span className="mt-2 text-lg sm:text-xl">funds calculated</span>
        </div>

        {/* Card 6 */}
        <div className="bg-[#006C77] rounded-md p-10 flex flex-col items-center justify-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-secondary-300">
            80%
          </h2>
          <span className="mt-2 text-lg sm:text-xl">success rate</span>
        </div>
      </div>
    </div>
  );
};

export default KeyMetrics;
