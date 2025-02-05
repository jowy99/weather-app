import PropTypes from 'prop-types';

function BigCard({ title, icon, value }) {
    return (
        <div className='flex flex-col p-6 w-full h-full items-center justify-between rounded-3xl border shadow-lg transition-transform duration-300 hover:scale-105
            backdrop-blur-lg backdrop-saturate-150 bg-white/50 dark:bg-[rgba(17,25,40,0.5)] border-gray-300/20 dark:border-white/10'>
            <h3 className='mb-4 text-xl font-semibold text-gray-900 dark:text-white'>{title}</h3>
            <div className='flex flex-col items-center space-y-4'>
                <div className='flex items-center justify-center p-5 transition-all duration-300 rounded-full shadow-md bg-neutral/50 dark:bg-gray-800/50'>
                    <img src={icon} alt={title} className='w-20 h-20 drop-shadow-md' />
                </div>
                <p className='text-2xl font-bold text-gray-800 dark:text-gray-200'>{value}</p>
            </div>
        </div>
    );
}

BigCard.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
};

export default BigCard;