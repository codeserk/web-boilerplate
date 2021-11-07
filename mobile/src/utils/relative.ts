import { RFValue } from 'react-native-responsive-fontsize'

import { deviceHeight } from './dimensions'

enum RelativeMult {
  Exact = 'exact',
  Strong = 'strong',
  Weak = 'weak',
}

const REFERENCE_SIZE = 896
const RELATIVE_SIZES: Record<RelativeMult, number> = {
  [RelativeMult.Exact]: REFERENCE_SIZE,
  [RelativeMult.Strong]: Math.min(
    REFERENCE_SIZE,
    REFERENCE_SIZE - (REFERENCE_SIZE - deviceHeight) * 0.25,
  ),
  [RelativeMult.Weak]: Math.min(
    REFERENCE_SIZE,
    REFERENCE_SIZE - (REFERENCE_SIZE - deviceHeight) * 0.5,
  ),
}

export function RelativeSize(value: number, mult: RelativeMult = RelativeMult.Weak) {
  return RFValue(value, RELATIVE_SIZES[mult])
}

export function ExactRelativeSize(value: number) {
  return RelativeSize(value, RelativeMult.Exact)
}
export function StrongRelativeSize(value: number) {
  return RelativeSize(value, RelativeMult.Strong)
}
export function WeakRelativeSize(value: number) {
  return RelativeSize(value, RelativeMult.Weak)
}
