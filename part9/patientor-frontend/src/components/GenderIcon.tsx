import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Gender } from '../types';

type GenderIconProps = {
  gender: Gender;
};

const GenderIcon = ({ gender }: GenderIconProps) => {
  switch (gender) {
    case Gender.Female:
      return <Icon name="venus" />;
    case Gender.Male:
      return <Icon name="mars" />;
    case Gender.Other:
      return <Icon name="genderless" />;
  }
};

export default GenderIcon;
