import { Fade, Slide } from "react-awesome-reveal";

const Loader = ({ section }: { section: string }) => {
    return (
        <>
            <Slide className="flex flex-col items-center my-8 w-full" direction="left" triggerOnce>
                <div>
                    <Fade>
                        <div className="text-center font-black text-5xl">
                            Cargando {section}...
                        </div>
                    </Fade>
                </div>
                <div className="flex flex-col self-center gap-12 w-[80%] animate-pulse">
                    <div className="relative flex flex-row bg-neutral-400/50 w-full h-32 animate-pulse rounded-md p-4">
                        <div className="absolute inset-0 flex flex-row justify-between items-center p-4 h-[15vh]">
                            <div className="flex flex-col w-[25%] items-center gap-2">
                                <div className="bg-neutral-800/50 w-[50%] h-8 rounded-md" />
                                <div className="bg-neutral-800/50 w-[30%] h-8 rounded-md" />
                            </div>
                            <div className="w-[50%] flex flex-row justify-between items-center">
                                <div className="bg-neutral-800/50 w-[45%] h-8 rounded-md" />
                                <div className="bg-neutral-800/50 mx-6 w-[25%] h-6 rounded-md" />
                                <div className="bg-neutral-800/50 w-[45%] h-8 rounded-md" />
                            </div>
                            <div className="flex flex-col justify-center items-center w-[25%] gap-2">
                                <div className="bg-neutral-800/50 w-[50%] h-8 rounded-md" />
                                <div className="bg-neutral-800/50 w-[75%] h-8 rounded-md" />
                            </div>
                        </div>
                    </div>
                    <div className="relative flex flex-row bg-neutral-400/50 w-full h-32 animate-pulse rounded-md p-4">
                        <div className="absolute inset-0 flex flex-row justify-between items-center p-4 h-[15vh]">
                            <div className="flex flex-col w-[25%] items-center gap-2">
                                <div className="bg-neutral-800/50 w-[50%] h-8 rounded-md" />
                                <div className="bg-neutral-800/50 w-[30%] h-8 rounded-md" />
                            </div>
                            <div className="w-[50%] flex flex-row justify-between items-center">
                                <div className="bg-neutral-800/50 w-[45%] h-8 rounded-md" />
                                <div className="bg-neutral-800/50 mx-6 w-[25%] h-6 rounded-md" />
                                <div className="bg-neutral-800/50 w-[45%] h-8 rounded-md" />
                            </div>
                            <div className="flex flex-col justify-center items-center w-[25%] gap-2">
                                <div className="bg-neutral-800/50 w-[50%] h-8 rounded-md" />
                                <div className="bg-neutral-800/50 w-[75%] h-8 rounded-md" />
                            </div>
                        </div>
                    </div>
                    <div className="relative flex flex-row bg-neutral-400/50 w-full h-32 animate-pulse rounded-md p-4">
                        <div className="absolute inset-0 flex flex-row justify-between items-center p-4 h-[15vh]">
                            <div className="flex flex-col w-[25%] items-center gap-2">
                                <div className="bg-neutral-800/50 w-[50%] h-8 rounded-md" />
                                <div className="bg-neutral-800/50 w-[30%] h-8 rounded-md" />
                            </div>
                            <div className="w-[50%] flex flex-row justify-between items-center">
                                <div className="bg-neutral-800/50 w-[45%] h-8 rounded-md" />
                                <div className="bg-neutral-800/50 mx-6 w-[25%] h-6 rounded-md" />
                                <div className="bg-neutral-800/50 w-[45%] h-8 rounded-md" />
                            </div>
                            <div className="flex flex-col justify-center items-center w-[25%] gap-2">
                                <div className="bg-neutral-800/50 w-[50%] h-8 rounded-md" />
                                <div className="bg-neutral-800/50 w-[75%] h-8 rounded-md" />
                            </div>
                        </div>
                    </div>
                </div>
            </Slide>
        </>
    );
}

export default Loader;