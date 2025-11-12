import { StyleSheet } from 'react-native'
import React from 'react'
import Home from './Home'
import ArrowLeft from './ArrowLeft'
import Mail from './Mail'
import { theme } from '@/constants/theme'
import Lock from './Lock'
import User from './User'
import Plus from './Plus'
import Heart from './Heart'
import Logout from './Logout'
import Edit from './Edit'
import Call from './Call'
import Camera from './Camera'
import Location from './Location'
import Image from './Image'
import Video from './Video'
import Delete from './Delete'
import Share from './Share'
import More from './More'
import Comment from './Comment'

type IconName = 'home'| 'arrowLeft' | 'mail' | 'lock' | 'user' | 'heart' | 'plus' | 'logout' | 'edit' | 'call' | 'camera' | 'location' | 'image' | 'video' | 'delete' | 'more' | 'comment' | 'share'; // extend as you add more icons

type IconComponentProps = {
  height?: string | number;
  width?: string | number;
  strokeWidth?: number;
  color?: string;
  [key: string]: any;
};

const icons: Record<IconName, React.ComponentType<IconComponentProps>> = {
  home: Home,
  arrowLeft: ArrowLeft,
  mail: Mail,
  lock: Lock,
  user: User,
  heart: Heart,
  plus: Plus,
  logout: Logout,
  edit: Edit,
  call: Call,
  camera: Camera,
  location: Location,
  image: Image,
  video: Video,
  delete: Delete,
  share: Share,
  more: More,
  comment: Comment,
};

type IconProps = {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  color?: string;
} & Omit<IconComponentProps, 'height' | 'width' | 'strokeWidth' | 'color'>;

const Icon: React.FC<IconProps> = ({ name, size, strokeWidth, color, ...props }) => {
  const IconComponent = icons[name];
  return (
    <IconComponent
      height={size ?? 24}
      width={size ?? 24}
      strokeWidth={strokeWidth ?? 2}
      color={color ?? theme.colors.textLight}
      {...(props as IconComponentProps)}
    />
  )
}

export default Icon

const styles = StyleSheet.create({})