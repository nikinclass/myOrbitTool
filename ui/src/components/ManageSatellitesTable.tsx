import { Eye, EyeClosed, MoreHorizontal } from "lucide-react";
import { useAppSession } from "./AppSessionProvider";
import type { Satellite } from "@/types";
import { useState } from "react";
import { EditSatForm } from "@/components/EditSatelliteForm";

export function ManageSatellitesTable() {
  const { scenario, toggleVisibility, isLoading } = useAppSession();

  const [selectedSatellite, setSelectedSatellite] = useState<Satellite | null>(
    null
  );

  const someSatsVisible = scenario?.satellites.some(
    (item) => item.CZML.props.show
  );

  if (isLoading) return <></>;

  return (
    <>
      {selectedSatellite && (
        <EditSatForm
          satellite={selectedSatellite}
          closeModal={() => setSelectedSatellite(null)}
        />
      )}
      {!selectedSatellite && (
        <div className="w-full bg-secondary text-secondary-foreground opacity-75 rounded-lg overflow-hidden">
          <div className="flex gap-1 bg-card font-bold text-sm p-3">
            <div className="w-[30px] flex justify-center items-center pr-1">
              <button
                className="cursor-pointer hover:bg-none flex justify-center items-center text-center"
                onClick={() => {
                  if (scenario?.satellites)
                    toggleVisibility(scenario.satellites);
                }}
              >
                {someSatsVisible && <Eye className="w-5 h-5" />}
                {!someSatsVisible && <EyeClosed className="w-5 h-5" />}
              </button>
            </div>
            <p className="w-[70px] self-center pr-1">SATNO</p>
            <p className="w-[120px] self-center pr-1">Name</p>
            <div className="w-[50px] self-center pr-1">Color</div>
            <div className="w-[30px] self-center pr-1"></div>
          </div>
          <div className="flex flex-col text-sm gap-2 p-2">
            {!(scenario && scenario.satellites.length > 0) && (
              <p className="p-2 text-center w-full">
                No satellites have been added to the scenario yet!
              </p>
            )}
            {scenario &&
              scenario.satellites.length > 0 &&
              scenario?.satellites.map((sat: Satellite, index: number) => (
                <div
                  key={index}
                  className="select-none hover:bg-accent-foreground/10 hover:rounded-lg dark:hover:bg-card/80 p-1 flex gap-1"
                >
                  <div className="w-[30px] flex justify-center items-center pr-1">
                    <button
                      className="cursor-pointer hover:bg-none flex justify-center items-center"
                      onClick={() => {
                        toggleVisibility([sat]);
                      }}
                    >
                      {sat.CZML.props.show && <Eye className="w-5 h-5" />}
                      {!sat.CZML.props.show && (
                        <EyeClosed className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <p className="w-[70px] self-center truncate overflow-hidden pr-1">
                    {sat.NORAD_CAT_ID}
                  </p>
                  <p className="w-[120px] self-center truncate overflow-hidden pr-1">
                    {sat.OBJECT_NAME}
                  </p>
                  <div className="w-[50px] self-center flex truncate overflow-hidden justify-center items-center">
                    <input
                      className="rounded-full w-5 h-5"
                      type="color"
                      name=""
                      id=""
                      style={{ borderRadius: 100 }}
                    />
                  </div>
                  <div className="w-[30px] self-center truncate overflow-hidden cursor-pointer">
                    <MoreHorizontal
                      key={index}
                      onClick={() => {
                        setSelectedSatellite(sat);
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
