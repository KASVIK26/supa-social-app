import React from 'react';
import Home from './Home';
import Mail from './Mail';
import Lock from './Lock';
import User from './User';
import Plus from './Plus';
import Heart from './Heart';
import Search from './Search';
import Location from './Location';
import Call from './Call';
import Camera from './Camera';
import Edit from './Edit';
import ArrowLeft from './ArrowLeft';
import ThreeDotsCircle from './ThreeDotsCircle';
import ThreeDotsHorizontal from './ThreeDotsHorizontal';
import Comment from './Comment';
import Share from './Share';
import Send from './Send';
import Delete from './Delete';
import Logout from './Logout';
import Image from './Image';
import Video from './Video';

import { theme } from '../../constants/theme';

const icons = {
  home: Home,
  mail: Mail,
  lock: Lock,
  user: User,
  plus: Plus,
  heart: Heart,
  search: Search,
  location: Location,
  call: Call,
  camera: Camera,
  edit: Edit,
  arrowLeft: ArrowLeft, // Ensure correct casing of `arrowLeft`
  threeDotsCircle: ThreeDotsCircle,
  threeDotsHorizontal: ThreeDotsHorizontal,
  comment: Comment,
  share: Share,
  send: Send,
  delete: Delete,
  logout: Logout,
  image: Image,
  video: Video,
};

const Icon = ({ name, size = 24, strokeWidth = 1.9, color, ...props }) => {
  const IconComponent = icons[name];

  // Error handling for missing icons
  if (!IconComponent) {
    console.warn(`Icon component "${name}" not found.`);
    return null; // Return null to avoid rendering undefined components
  }

  return (
    <IconComponent
      width={size}
      height={size}
      strokeWidth={strokeWidth}
      color={color || theme.colors.textLight} // Default to theme color, but allow override via props
      {...props}
    />
  );
};

export default Icon;
