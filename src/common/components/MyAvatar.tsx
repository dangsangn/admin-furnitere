// hooks
import { useSelector } from '../redux/store';
// utils
import createAvatar from '../utils/createAvatar';
//
import { profileSelector } from '../../auth/login/login.slice';
import Avatar, { Props as AvatarProps } from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }: AvatarProps) {
  const user = useSelector(profileSelector);

  return (
    <Avatar
      src={''}
      alt={user?.name}
      color={createAvatar(user?.name as string).color}
      {...other}
    >
      {createAvatar(user?.name as string).name}
    </Avatar>
  );
}
