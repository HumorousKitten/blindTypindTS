export const emailPattern = {
  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
  message: 'Некорректный e-mail',
};

export const minLength = (length: number, message: string) => ({
  value: length,
  message,
});

export const maxLength = (length: number, message: string) => ({
  value: length,
  message,
});


export function validateLengthRange(end: number, str: string): boolean
export function validateLengthRange(startFrom: number, end: number, str: string): boolean

export function validateLengthRange(startFromOrEnd: number, endOrStr: number | string, str?: string): boolean {

  if(typeof endOrStr === 'string'){
    const regexpMax = new RegExp(`^.{0,${startFromOrEnd}}$`)
    return regexpMax.test(endOrStr)
  }
  else if(typeof endOrStr === 'number' && typeof str === 'string'){
    const regexpRange = new RegExp(`^.{${startFromOrEnd},${endOrStr}}$`)
    return regexpRange.test(str)
  }
  else {
    throw new Error('Invalid arguments')
  }
}