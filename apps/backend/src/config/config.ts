import {ConfigProps} from "../interface/interface.config";
export const config = ():ConfigProps => ({
    port: parseInt(process.env.NEST_PORT||"3002",10)
})