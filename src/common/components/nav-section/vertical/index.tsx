// @mui
import { List, Box } from '@mui/material';
// hooks
//
import { NavSectionProps } from '../type';
import { ListSubheaderStyle } from './style';
import NavList from './NavList';
import useLocales from 'src/common/hooks/useLocales';
import { useSelector } from 'react-redux';
import { policiesSelector, rulesSelector } from '../../../../auth/login/login.slice';
import Can from '../../../lib/Can';

// ----------------------------------------------------------------------

export default function NavSectionVertical({
  navConfig,
  isCollapse,
  ...other
}: NavSectionProps) {
  const { translate } = useLocales();
  const policies = useSelector(policiesSelector);
  const rules = useSelector(rulesSelector);

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
            ? group.items.map((list) => (
                <NavList
                  key={list.title + list.path}
                  data={list}
                  depth={1}
                  hasChildren={!!list.children}
                  isCollapse={isCollapse}
                />
              ))
            : group.items.map((list, index) => (
                <Can do={list?.action} on={list?.resource} key={index}>
                  <NavList
                    key={list.title + list.path}
                    data={list}
                    depth={1}
                    hasChildren={!!list.children}
                    isCollapse={isCollapse}
                  />
                </Can>
              ))}
        </List>
      ))}
    </Box>
  );
}
