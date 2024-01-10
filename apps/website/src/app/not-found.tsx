









import {Button} from "@lumoflo/ui";

const NotFound = () => {
    return(
        <div className={"w-full h-screen flex flex-col items-center justify-center"}>
            <img src={"/404.svg"} alt={"404"} className={"w-1/2"}/>
            <img src={"/cl_logo.svg"} alt={"404"} className={"w-52"}/>
            <div className={"flex flex-row items-center gap-3 mt-5"}>
                <Button variant={"outline"}>Home</Button>
                <Button variant={"outline"}>Login</Button>
            </div>
        </div>
    )
}

export default NotFound;