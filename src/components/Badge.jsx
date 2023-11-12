import { Badges, BadgeColors } from '../utils/badges.js';
import PropTypes from 'prop-types';

const Badge = ({ type }) => {
    if (Object.values(Badges).includes(type)) {
        const badgeIndex = Object.keys(BadgeColors).indexOf(type);
        const badgeValue = Object.values(BadgeColors)[badgeIndex];

        return (
            <div
                className="text-white px-2 rounded-full text-lg"
                style={{ backgroundColor: badgeValue }}
            >
                {type}
            </div>
        );
    }
};

export default Badge;

Badge.propTypes = {
    type: PropTypes.string.isRequired,
};
