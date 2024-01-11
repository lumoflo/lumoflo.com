import { ConfigProps } from "../interface/interface.config";
import * as process from "process";

export const config = (): ConfigProps => {
  console.log(process.env.NEST_PORT)
  return ({
    port: parseInt(process.env.NEST_PORT || "3002", 10),
  })
};
