// @mui
import { Box, List } from '@mui/material';
// hooks
//
import { useSelector } from 'react-redux';
import useLocales from 'src/common/hooks/useLocales';
import { policiesSelector, roleIdSelector } from '../../../../auth/login/login.slice';
import Can from '../../../lib/Can';
import { NavSectionProps } from '../type';
import NavList from './NavList';
import { ListSubheaderStyle } from './style';

// ----------------------------------------------------------------------

export default function NavSectionVertical({
  navConfig,
  isCollapse,
  ...other
}: NavSectionProps) {
  const { translate } = useLocales();
  const policies = useSelector(policiesSelector);
  const roleId = useSelector(roleIdSelector);

  return (
    <Box {...other}>
      {navConfig.map((group) => (
        <List key={group.subheader} disablePadding sx={{ px: 2 }}>
          <ListSubheaderStyle
            sx={{
              ...(isCollapse && {
                opacity: 0,
              }),
            }}
          >
            {translate(group.subheader)}
          </ListSubheaderStyle>

          {!policies?.length
            ? group.items.map((list) => {
                return (
                  <NavList
                    key={list.title + list.path}
                    data={list}
                    depth={1}
                    hasChildren={!!list.children}
                    isCollapse={isCollapse}
                    canClick={roleId === 1 || list.roleId === roleId}
                  />
                );
              })
            : group.items.map((list, index) => (
                <Can do={list?.action} on={list?.resource} key={index}>
                  <NavList
                    key={list.title + list.path}
                    data={list}
                    depth={1}
                    hasChildren={!!list.children}
                    isCollapse={isCollapse}
                    canClick={roleId === 1 || list.roleId === roleId}
                  />
                </Can>
              ))}
        </List>
      ))}
    </Box>
  );
}
