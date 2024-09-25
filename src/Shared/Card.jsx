/* eslint-disable react/prop-types */

const Card = ({news}) => {
    return (
        <div>
            <div className="h-[237px] relative">
                <img src={news?.img} alt="" className='h-full object-cover w-full'/>

                <div className='absolute bottom-0 text-white bg-gradient-to-r from-[#151515] to-[rgba(21 , 21, 21 , 0)]'>
                    <h3 className="text-lg font-bold">{news?.title}</h3>
                </div>
                
            </div>
            

            
        </div>
    );
};

export default Card;