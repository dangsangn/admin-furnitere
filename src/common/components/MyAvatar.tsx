// hooks
import { merchantInfoSelector } from 'src/profile/common/reducers/merchant-profile.slice';
import useAuth from '../hooks/useAuth';
import { useSelector } from '../redux/store';
// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar, { Props as AvatarProps } from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }: AvatarProps) {
  const user = useSelector(merchantInfoSelector);

  return (
    <Avatar
      src={user?.avatar?.url}
      alt={user?.name}
      color={user?.photoURL ? 'default' : createAvatar(user?.name as string).color}
      {...other}
    >
      {createAvatar(user?.name as string).name}
    </Avatar>
  );
}
