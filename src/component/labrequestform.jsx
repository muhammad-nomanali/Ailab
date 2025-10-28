import React from "react";

const LabRequestForm = () => {
    return (
        <>
            <div className="relative w-full h-[590px] bg-[url('/src/assets/header-img1.jpg')] bg-cover bg-center flex items-center justify-center">
                {/* Overlay */}
                <div className="absolute inset-0 bg-black opacity-70"></div>

                {/* Content (appears above overlay) */}
                <div className="relative z-10 text-white text-center flex flex-col items-center justify-center h-full">
                    <h1 className="text-4xl font-bold">Request The Slot in Labs</h1>
                    <p className="mt-4 text-lg w-1/2">We pionneer advancements in Artifical Intelligence to slove real-world chanllenges and shape an integent future. Committed to continuous learning, adaptation and evolution, we transform data into deployable, smart solutions that make a measureable difference.</p>
                </div>
            </div>
            <div className="w-[90%] mx-auto">
                <form action="" className="py-10 flex flex-col gap-7">
                    <div className="flex w-full gap-[50px]">
                        <div className="flex flex-col w-full gap-5">
                            <label htmlFor="">From Date</label>
                            <input type="date" className="border border-black outline-none w-full px-5 py-2 rounded" />
                        </div>
                        <div className="flex flex-col w-full gap-5">
                            <label htmlFor="">To Date</label>
                            <input type="date" className="border border-black outline-none w-full px-5 py-2 rounded" />
                        </div>
                    </div>
                    <div className="flex w-full gap-[50px]">
                        <div className="flex flex-col w-full gap-5">
                            <label htmlFor="">From Time</label>
                            <input type="time" className="border border-black outline-none w-full px-5 py-2 rounded" />
                        </div>
                        <div className="flex flex-col w-full gap-5">
                            <label htmlFor="">To Time</label>
                            <input type="time" className="border border-black outline-none w-full px-5 py-2 rounded" />
                        </div>
                    </div>
                    <div className="flex flex-col w-full gap-5">
                        <label htmlFor="">Purpose</label>
                        {/* <input type="time" className="border border-black outline-none w-full px-5 py-2 rounded" /> */}
                        <textarea name="" id="" cols="30" rows="10" className="border border-black outline-none w-full px-5 py-2 rounded"></textarea>
                    </div>

                    <div className="flex w-full gap-[50px]">
                        <div className="flex flex-col w-full gap-5">
                            <label htmlFor="">Responsible Person</label>
                            <input type="name" className="border border-black outline-none w-full px-5 py-2 rounded" />
                        </div>
                        <div className="flex flex-col w-full gap-5">
                            <label htmlFor="">Responsible Person contact</label>
                            <input type="number" className="border border-black outline-none w-full px-5 py-2 rounded" />
                        </div>
                    </div>
                    <button type="submit" className="bg-[#F2A900] text-white px-5 py-2 rounded border border-[#F2A900] hover:bg-transparent hover:text-[#F2A900]">Submit</button>
                </form>
            </div>
        </>
    )
}

export default LabRequestForm