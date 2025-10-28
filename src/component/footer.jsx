import Logo from '../assets/AILAB.png';
import FacbookIcon from '../assets/icons/facebook.png';
import TwitterIcon from '../assets/icons/twitter.png';
import PrintestIcon from '../assets/icons/printrest.png';
import LinkedInIcon from '../assets/icons/linkedin.png';

const Footer = () => {
  return (
    <>

      <footer className="bg-[#003A70] text-white py-[50px]">
        <div className="w-[90%] mx-auto flex justify-between items-center gap-4 flex-wrap">
          <div className='w-1/3'>
            <img className='mix-blend-screen w-[100px]' src={Logo} alt="" />
            <p className='text-white'>
              Lorem ipsum dolor sit amet consectetur. Nunc lacinia nulla vestibulum feugiat diam. Lorem ipsum dolor sit amet consectetur. Nunc lacinia nulla vestibulum feugiat diam.
            </p>
          </div>
          <div className='w=1/3'>
            <ul className='flex gap-4'>
              <li className='text-white text-[16px] font-normal cursor-pointer my-4'>
                Home
              </li>
              <li className='text-white text-[16px] font-normal cursor-pointer my-4'>
                About Us
              </li>
              <li className='text-white text-[16px] font-normal cursor-pointer my-4'>
                Team
              </li>
              <li className='text-white text-[16px] font-normal cursor-pointer my-4'>
                Projects
              </li>
              <li className='text-white text-[16px] font-normal cursor-pointer my-4'>
                Contact Us
              </li>
            </ul>
            <div>
              <p className='text-white text-[16px] font-semibold my-4'>
                Follow us On
              </p>
              <ul className='flex gap-4'>
                <li>
                  <img className='w-[32px] h-[32px]' src={FacbookIcon} alt="" />
                </li>
                <li>
                  <img className='w-[32px] h-[32px]' src={PrintestIcon} alt="" />
                </li>
                <li>
                  <img className='w-[32px] h-[32px]' src={LinkedInIcon} alt="" />
                </li>
                <li>
                  <img className='w-[32px] h-[32px]' src={TwitterIcon} alt="" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <div className='bg-[#F2A900] text-white text-center py-2'>
        <p>
          © 2025 All Right Reserved, Lorem ipsum dolor sit amet consectetur.
        </p>
      </div>
    </>
  );
}
export default Footer;