import { enviroment } from "@libs/shared/data-access-user/src/enviroments/enviroment";
import { setRemoteDefinitions } from "@nx/angular/mf";

fetch("/assets/module-federation.manifest.json")
  .then((res) => res.json())
  .then((manifest) => {
    [manifest].map((hosting: any): any => {
      Object.keys(hosting).map((key: string): void => {
        hosting[key] = hosting[key].replace(
          "http://localhost",
          enviroment.WEB_HOST
        );
      });
    });
    return manifest;
  })
  .then((definitions) => {
    setRemoteDefinitions(definitions);
  })
  .then(() => import("./bootstrap").catch((err) => console.error(err)));
