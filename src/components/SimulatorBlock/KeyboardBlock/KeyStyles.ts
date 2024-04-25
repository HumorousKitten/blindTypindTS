import { IStylesOfKeyCaps } from '../../../types/types'

interface IStyles {
  [key: string]: IStylesOfKeyCaps 
}

const styles: IStyles = {
  identical: {
    width: 49.38 + 'px',
    height: 49.38 + 'px',
    borderRadius: 6.67 + 'px',
    background: '#1B1B1B',
  },
  Backspace: {
    width: 82 + 'px',
    height: 49.38 + 'px',
    borderRadius: 6.67 + 'px',
    background: '#1B1B1B',
  },
  Tab: {
    width: 80.08 + 'px',
    height: 49.38 + 'px',
    borderRadius: 6.67 + 'px',
    background: '#1B1B1B',
  },
  CapsLock: {
    width: 96.09 + 'px',
    height: 49.38 + 'px',
    borderRadius: 6.67 + 'px',
    background: '#1B1B1B',
  },
  Enter: {
    width: 92 + 'px',
    height: 49.38 + 'px',
    borderRadius: 6.67 + 'px',
    background: '#1B1B1B',
  },
  ShiftLeft: {
    width: 125.45 + 'px',
    height: 49.38 + 'px',
    borderRadius: 6.67 + 'px',
    background: '#1B1B1B',
  },
  ShiftRight: {
    width: 119 + 'px',
    height: 49.38 + 'px',
    borderRadius: 6.67 + 'px',
    background: '#1B1B1B',
  },
  Space: {
    width: 438 + 'px',
    height: 56 + 'px',
    borderRadius: 6.67 + 'px',
    background: '#1B1B1B',
  },
  Backslash: {
    width: 52.05 + 'px',
    height: 49.38 + 'px',
    borderRadius: 6.67 + 'px',
    background: '#1B1B1B',
  },

  HelpfulRecess: {
    width: '15px',
    height: '2px',
    background: 'rgba(139, 139, 139, 0.5)',
    position: 'absolute',
    bottom: '7px',
    left: '17px',
    borderRadius: '2px',
  }
};

export { styles };