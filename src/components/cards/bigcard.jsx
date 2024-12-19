import PropTypes from 'prop-types';

function BigCard({ title, icon, value }) {
    return(
        <div className='flex flex-col p-6 w-full h-full items-center justify-between border border-gray-300 rounded-3xl bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 shadow-xl transition-transform duration-300 hover:scale-105'>
            <h3 className='text-xl font-semibold text-blue-700 dark:text-blue-300 mb-4'>{title}</h3>
            <div className='flex flex-col items-center space-y-4'>
                <div className='flex items-center justify-center bg-white dark:bg-slate-500 rounded-full p-5 shadow-lg transition-all duration-300'>
                    <img src={icon} alt={title} className='w-20 h-20 opacity-90 drop-shadow-lg' />
                </div>
                <p className='text-2xl font-bold text-gray-800 dark:text-gray-200'>{value}</p>
            </div>
        </div>
    )
};

BigCard.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
};

export default BigCard;