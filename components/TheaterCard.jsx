import { lowerCase } from "@/lib/helpers";
import FlagImage from "./FlagImage";
import GetLocationButton from "./GetLocationButton";

export default function TheaterCard({ data, onToggle }) {
  return (
    <div>
      <dl className="my-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((theater) => (
          <div
            key={theater?._id}
            className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md p-3 ring-1 ring-indigo-500">
                <FlagImage
                  src={`https://flagcdn.com/32x24/${lowerCase(theater?.location?.address?.state)}.webp`}
                  altName="flag"
                />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {theater?.location?.address?.street1}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {theater?.location?.address?.city}
              </p>
              <p className="ml-2 flex items-baseline text-sm font-semibold">
                {theater?.location?.address?.state}
              </p>

              <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <GetLocationButton
                    cityName={theater?.location?.address?.city}
                    coordinates={theater?.location?.geo?.coordinates}
                    onToggle={onToggle}
                  />
                </div>
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
