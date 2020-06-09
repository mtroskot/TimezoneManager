import React from 'react';
import { AvatarCard } from 'src/components';

interface Props {
  firstName: string;
  lastName: string;
  emailAddress: string;
}

const UserSearchResults: React.FC<Props> = ({ firstName, lastName, emailAddress }) => {
  return <AvatarCard {...{ name: `${firstName} ${lastName}`, emailAddress }} />;
};

export default React.memo(UserSearchResults);
