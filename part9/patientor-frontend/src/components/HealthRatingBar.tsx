import React from 'react';
import { Rating } from 'semantic-ui-react';

const HEALTHBAR_TEXTS = [
  'The patient is in great shape',
  'The patient has a low risk of getting sick',
  'The patient has a high risk of getting sick',
  'The patient has a diagnosed condition',
];

const HealthRatingBar: React.FC<{ rating: number; showText: boolean }> = ({ rating, showText }) => {
  return (
    <div className="health-bar">
      {<Rating icon="heart" disabled rating={4 - rating} maxRating={4} />}
      {showText ? <p>{HEALTHBAR_TEXTS[rating]}</p> : null}
    </div>
  );
};

export default HealthRatingBar;
