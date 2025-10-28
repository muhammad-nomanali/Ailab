import Line from '../assets/Line.png';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import Timg1 from "../assets/t-img1.png";
import Timg2 from "../assets/t-img2.png";
import Timg3 from "../assets/t-img3.png";
import LImg1 from "../assets/labimg-1.png"
import LImg2 from "../assets/labimg-2.png"
import LImg3 from "../assets/labimg-3.png"
import LImg4 from "../assets/labimg-4.png"
import LImg5 from "../assets/labimg-5.png"
import LImg6 from "../assets/labimg-6.png"
import LeadImg from "../assets/Lead-img.png"
import { Link } from 'react-router-dom';

const Lab = () => {
    return (
        <>
            <div className="relative w-full h-[590px] bg-[url('/src/assets/ipad-bg.jpg')] bg-cover bg-center flex items-center justify-center">
                {/* Overlay */}
                <div className="absolute inset-0 bg-black opacity-70"></div>

                {/* Content (appears above overlay) */}
                <div className="relative z-10 text-white  text-center flex flex-col items-center justify-end h-full">
                    <div className="bg-[#003A70CC] flex flex-col items-center justify-center p-8">

                        <h1 className="text-4xl font-bold">AI( Artificial Intelligence) Lab</h1>
                        <p className="mt-4 text-lg w-1/2">Lorem ipsum dolor sit amet consectetur. Integer orci viverra nisl quam habitant eu ut amet. Faucibus nunc interdum duis mauris turpis </p>
                    </div>
                </div>
            </div>
            <div className="w-[90%] mx-auto my-10">
                <p className="text-justify text-lg">
                    Lorem ipsum dolor sit amet consectetur. Integer orci viverra nisl quam habitant eu ut amet. Faucibus nunc interdum duis mauris turpis augue lorem placerat rhoncus. Lorem ipsum dolor sit amet consectetur. Integer orci viverra nisl quam habitant eu ut amet. Faucibus nunc interdum duis mauris turpis augue lorem placerat rhoncus.Lorem ipsum dolor sit amet consectetur. Integer orci viverra nisl quam habitant eu ut amet. Faucibus nunc interdum duis mauris turpis augue lorem placerat rhoncus.Lorem ipsum dolor sit amet consectetur. Integer orci viverra nisl quam habitant eu ut amet. Faucibus nunc interdum duis mauris turpis augue lorem placerat rhoncus.Lorem ipsum dolor sit amet consectetur. Integer orci viverra nisl quam habitant eu ut amet. Faucibus nunc interdum duis mauris turpis augue lorem placerat rhoncus. onsectetur. Integer orci viverra nisl quam habitant eu ut amet. Faucibus nunc interdum duis mauris turpis augue lorem placerat rhoncus.
                </p>
            </div>
            <div class="bg-white py-6 sm:py-8 lg:py-12">
                <div class="mx-auto max-w-[90%]">
                    <div class="mb-4 flex items-center justify-between gap-8 sm:mb-8 md:mb-12">
                        <div className='flex items-end'>
                            <h2 className='text-[#151515F] font-semibold text-[25px] md:text-[40px]'>Our Gallery</h2>
                            <img className='hidden md:block' src={Line} alt="" />
                        </div>

                        {/* <a href="#" class="inline-block rounded-lg border bg-white px-4 py-2 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:px-8 md:py-3 md:text-base">More</a> */}
                    </div>

                    <div class="grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-6 xl:gap-8">
                        {/* <!-- image - start --> */}
                        <a href="#" class="group relative flex h-[397px] items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80">
                            <img src={LImg1} loading="lazy" alt="Photo by Minh Pham" class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                            <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

                            {/* <span class="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">VR</span> */}
                        </a>
                        {/* <!-- image - end --> */}

                        {/* <!-- image - start --> */}
                        <a href="#" class="group relative flex h-[397px] items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80">
                            <img src={LImg2} loading="lazy" alt="Photo by Magicle" class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                            <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

                            {/* <span class="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">Tech</span> */}
                        </a>
                        {/* <!-- image - end --> */}
                        {/* <!-- image - start --> */}
                        {/* <!-- image - start --> */}
                        <a href="#" class="group relative flex h-[397px] items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80">
                            <img src={LImg3} loading="lazy" alt="Photo by Minh Pham" class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                            <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

                            {/* <span class="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">VR</span> */}
                        </a>
                        {/* <!-- image - start --> */}
                        <a href="#" class="group relative flex h-[397px] items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80">
                            <img src={LImg4} loading="lazy" alt="Photo by Martin Sanchez" class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                            <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

                            {/* <span class="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">Dev</span> */}
                        </a>
                        {/* <!-- image - end --> */}
                        {/* <!-- image - end --> */}
                        <a href="#" class="group relative flex h-[397px] items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80">
                            <img src={LImg5} loading="lazy" alt="Photo by Minh Pham" class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                            <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

                            {/* <span class="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">VR</span> */}
                        </a>
                        {/* <!-- image - end --> */}


                        {/* <!-- image - start --> */}
                        <a href="#" class="group relative flex h-[397px] items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80">
                            <img src={LImg6} loading="lazy" alt="Photo by Lorenzo Herrera" class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                            <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

                            {/* <span class="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">Retro</span> */}
                        </a>
                        {/* <!-- image - end --> */}
                    </div>
                </div>
            </div>
            <div className="w-[90%] mx-auto">
                <div className='flex items-end'>
                    <h2 className='text-[#151515F] font-semibold text-[25px] md:text-[40px]'>Our Services</h2>
                    <img className='hidden md:block' src={Line} alt="" />
                </div>
                <div class="flex flex-wrap my-10">
                    <div class="p-4 md:w-1/3 flex flex-col text-center items-center">
                        <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10" viewBox="0 0 24 24">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                            </svg>
                        </div>
                        <div class="flex-grow">
                            <h2 class="text-gray-900 text-lg title-font font-medium mb-3">Shooting Stars</h2>
                            <p class="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug VHS try-hard.</p>
                            <a class="mt-3 text-indigo-500 inline-flex items-center">Learn More
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div class="p-4 md:w-1/3 flex flex-col text-center items-center">
                        <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10" viewBox="0 0 24 24">
                                <circle cx="6" cy="6" r="3"></circle>
                                <circle cx="6" cy="18" r="3"></circle>
                                <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                            </svg>
                        </div>
                        <div class="flex-grow">
                            <h2 class="text-gray-900 text-lg title-font font-medium mb-3">The Catalyzer</h2>
                            <p class="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug VHS try-hard.</p>
                            <a class="mt-3 text-indigo-500 inline-flex items-center">Learn More
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div class="p-4 md:w-1/3 flex flex-col text-center items-center">
                        <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10" viewBox="0 0 24 24">
                                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </div>
                        <div class="flex-grow">
                            <h2 class="text-gray-900 text-lg title-font font-medium mb-3">Neptune</h2>
                            <p class="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug VHS try-hard.</p>
                            <a class="mt-3 text-indigo-500 inline-flex items-center">Learn More
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-[90%] mx-auto'>
                <div className='w-2/3 flex flex-col gap-[21px]'>
                    <div className='flex items-end'>
                        <h2 className='text-[#151515F] font-semibold text-[25px] md:text-[40px]'>Lead By</h2>
                        <img className='hidden md:block' src={Line} alt="" />
                    </div>
                </div>
                <div className='flex gap-[50px]'>
                    <div className="w-1/2">
                        <img src={LeadImg} alt="" />
                    </div>
                    <div className="w-1/2">
                        <h3>Dr. Kevin Martin</h3>
                        <span>Researcher & Professor</span>
                        <p>
                            Lorem ipsum dolor sit amet, con adipiscing elit tiam convallis elit id impedie. Quisq commodo simply free ornare tortor. Lorem ipsum dolor sit amet, con adipiscing elit tiam convallis elit id impedie. Quisq commodo simply free ornare tortor.
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-[90%] mx-auto flex flex-col gap-[20px] py-10">
                <div className='w-2/3 flex flex-col gap-[21px]'>
                    <div className='flex items-end'>
                        <h2 className='text-[#151515F] font-semibold text-[25px] md:text-[40px]'>Meet Our Team</h2>
                        <img className='hidden md:block' src={Line} alt="" />
                    </div>
                </div>
                <div>
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={3.4}
                        autoplay={{ delay: 3000 }}
                        loop
                        className="myswiper"
                        breakpoints={{
                            // when window width is >= 320px
                            320: {
                                slidesPerView: 1.2,
                            },
                            // when window width is >= 640px
                            640: {
                                slidesPerView: 1.8,
                            },
                            // when window width is >= 768px
                            768: {
                                slidesPerView: 2.2,
                            },
                            // when window width is >= 1024px
                            1024: {
                                slidesPerView: 3.4,
                            },
                        }}
                    >
                        <SwiperSlide>
                            <div class="p-4 ">
                                <div class="h-full flex flex-col items-center text-center">
                                    <img alt="team" class="flex-shrink-0 rounded-lg w-full h-[416] object-cover object-center mb-4" src={Timg1} />
                                    <div class="w-full">
                                        <h2 class="title-font font-medium text-lg text-gray-900">Alper Kamu</h2>
                                        <h3 class="text-gray-500 mb-3">UI Developer</h3>

                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div class="p-4 ">
                                <div class="h-full flex flex-col items-center text-center">
                                    <img alt="team" class="flex-shrink-0 rounded-lg w-full h-[416] object-cover object-center mb-4" src={Timg2} />
                                    <div class="w-full">
                                        <h2 class="title-font font-medium text-lg text-gray-900">Alper Kamu</h2>
                                        <h3 class="text-gray-500 mb-3">UI Developer</h3>

                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div class="p-4 ">
                                <div class="h-full flex flex-col items-center text-center">
                                    <img alt="team" class="flex-shrink-0 rounded-lg w-full h-[416] object-cover object-center mb-4" src={Timg3} />
                                    <div class="w-full">
                                        <h2 class="title-font font-medium text-lg text-gray-900">Alper Kamu</h2>
                                        <h3 class="text-gray-500 mb-3">UI Developer</h3>

                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div class="p-4 ">
                                <div class="h-full flex flex-col items-center text-center">
                                    <img alt="team" class="flex-shrink-0 rounded-lg w-full h-[416] object-cover object-center mb-4" src={Timg1} />
                                    <div class="w-full">
                                        <h2 class="title-font font-medium text-lg text-gray-900">Alper Kamu</h2>
                                        <h3 class="text-gray-500 mb-3">UI Developer</h3>

                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div class="p-4 ">
                                <div class="h-full flex flex-col items-center text-center">
                                    <img alt="team" class="flex-shrink-0 rounded-lg w-full h-[416] object-cover object-center mb-4" src={Timg2} />
                                    <div class="w-full">
                                        <h2 class="title-font font-medium text-lg text-gray-900">Alper Kamu</h2>
                                        <h3 class="text-gray-500 mb-3">UI Developer</h3>

                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div class="p-4 ">
                                <div class="h-full flex flex-col items-center text-center">
                                    <img alt="team" class="flex-shrink-0 rounded-lg w-full h-[416] object-cover object-center mb-4" src={Timg3} />
                                    <div class="w-full">
                                        <h2 class="title-font font-medium text-lg text-gray-900">Alper Kamu</h2>
                                        <h3 class="text-gray-500 mb-3">UI Developer</h3>

                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
            <div className="relative w-full h-[590px] bg-[url('/src/assets/bookback.png')] bg-cover bg-center flex items-center justify-center">

                <div className="relative z-10 text-white text-center flex flex-col items-center justify-center h-full">
                    <h1 className="text-4xl font-bold">Request Slot in AI Lab</h1>
                    <p className="mt-4 text-lg w-1/2">We pionneer advancements in Artifical Intelligence to slove real-world chanllenges and shape an integent future. Committed to continuous learning, adaptation and evolution, we transform data into deployable, smart solutions that make a measureable difference.</p>
                    <Link to="/labRequestForm" className='border border-white rounded-lg mt-5 p-2'>Request</Link>
                </div>
            </div>
        </>
    );
}
export default Lab;