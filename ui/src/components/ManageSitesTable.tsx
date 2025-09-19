import { Eye, EyeClosed, MoreHorizontal } from "lucide-react";
import { useAppSession } from "./AppSessionProvider";
import type { Site } from "@/types";
import { useState } from "react";
import { EditSiteForm } from "./EditSiteForm";

export function ManageSitesTable({ closeModal }: { closeModal: () => void }) {
  const { scenario, toggleVisibility } = useAppSession();

  const [selectedSite, setSelectedSite] = useState<Site | null>(null);

  const someSitesVisible = scenario?.satellites.some(
    (item) => item.CZML.props.show
  );

  return (
    <>
      {selectedSite && (
        <EditSiteForm site={selectedSite} closeModal={closeModal} />
      )}
      {!selectedSite && (
        <div className="w-full bg-secondary text-secondary-foreground opacity-75 rounded-lg overflow-hidden">
          <div className="flex gap-1 bg-card font-bold text-sm p-3">
            <div className="w-[30px] flex justify-center items-center pr-1">
              <button
                className="cursor-pointer hover:bg-none flex justify-center items-center text-center"
                onClick={() => {
                  if (scenario?.sites) toggleVisibility(scenario.sites);
                }}
              >
                {someSitesVisible && <Eye className="w-5 h-5" />}
                {!someSitesVisible && <EyeClosed className="w-5 h-5" />}
              </button>
            </div>
            <p className="w-[100px] self-center pr-1">Name</p>
            <p className="w-[70px] self-center pr-1">Lat</p>
            <div className="w-[70px] self-center pr-1">Long</div>
            <div className="w-[50px] text-center self-center pr-1">Color</div>
            <div className="w-[30px] self-center pr-1"></div>
          </div>
          <div className="flex flex-col text-sm gap-2 p-2">
            {!(scenario && scenario.sites.length > 0) && (
              <p className="p-2 text-center w-full">
                No sites have been added to the scenario yet!
              </p>
            )}
            {scenario &&
              scenario.sites.length > 0 &&
              scenario?.sites.map((site: Site, index: number) => (
                <div
                  key={index}
                  className="select-none hover:bg-accent-foreground/10 hover:rounded-lg dark:hover:bg-card/80 p-1 flex gap-1"
                >
                  <div className="w-[30px] flex justify-center items-center pr-1">
                    <button
                      className="cursor-pointer hover:bg-none flex justify-center items-center"
                      onClick={() => {
                        toggleVisibility([site]);
                      }}
                    >
                      {site.CZML.props.show && <Eye className="w-5 h-5" />}
                      {!site.CZML.props.show && (
                        <EyeClosed className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <p className="w-[100px] self-center truncate overflow-hidden pr-1">
                    {site.name}
                  </p>
                  <p className="w-[70px] self-center truncate overflow-hidden pr-1">
                    {site.latitude}
                  </p>
                  <p className="w-[70px] self-center truncate overflow-hidden pr-1">
                    {site.longitude}
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
                        setSelectedSite(site);
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
