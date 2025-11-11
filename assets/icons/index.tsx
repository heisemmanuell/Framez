import { StyleSheet } from 'react-native'
import React from 'react'
import Home from './Home'
import ArrowLeft from './ArrowLeft'
import Mail from './Mail'
import { theme } from '@/constants/theme'
import Lock from './Lock'
import User from './User'

type IconName = 'home'| 'arrowLeft' | 'mail' | 'lock' | 'user'; // extend as you add more icons

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