import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// @mui
import { List, Collapse, Link } from '@mui/material';
//
import { NavListProps } from '../type';
import NavItem from './NavItem';
import { getActive, isExternalLink } from '..';
import { useSelector } from 'react-redux';
import { roleIdSelector } from '../../../../auth/login/login.slice';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

type NavListRootProps = {
  data: NavListProps;
  depth: number;
  hasChildren: boolean;
  isCollapse?: boolean;
  canClick: boolean;
};

export default function NavList({
  data,
  depth,
  hasChildren,
  isCollapse = false,
  canClick,
}: NavListRootProps) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { pathname } = useLocation();

  const active = getActive(data.path, pathname);

  const [open, setOpen] = useState(active);

  const handleClickItem = () => {
    if (!canClick) {
      enqueueSnackbar('Bạn không quyền vào chức năng này', {
        variant: 'success',
        autoHideDuration: 1000,
      });
      return;
    }
    if (!hasChildren) {
      navigate(data.path);
    }
    setOpen(!open);
  };

  return (
    <>
      {isExternalLink(data.path) ? (
        <Link href={data.path} target="_blank" rel="noopener" underline="none">
          <NavItem
            item={data}
            depth={depth}
            open={open}
            active={active}
            isCollapse={isCollapse}
          />
        </Link>
      ) : (
        <NavItem
          item={data}
          depth={depth}
          open={open}
          active={active}
          isCollapse={isCollapse}
          onClick={handleClickItem}
        />
      )}

      {!isCollapse && hasChildren && (
        <Collapse in={open} unmountOnExit>
          <List component="div" disablePadding>
            <NavSubList data={data.children} depth={depth} />
          </List>
        </Collapse>
      )}
    </>
  );
}

// ----------------------------------------------------------------------

type NavListSubProps = {
  data: NavListProps[];
  depth: number;
};

function NavSubList({ data, depth }: NavListSubProps) {
  const roleId = useSelector(roleIdSelector);
  return (
    <>
      {data.map((list) => (
        <NavList
          key={list.title + list.path}
          data={list}
          depth={depth + 1}
          hasChildren={!!list.children}
          canClick={roleId === 1 || list.roleId === roleId}
        />
      ))}
    </>
  );
}
