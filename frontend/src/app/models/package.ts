export interface Package{
    id: number,
    planName: string,
    monthlyPrice: number,
    duration: number
}

export const default_package: Package = {
    id: -1,
    planName: '',
    monthlyPrice: 0,
    duration: 1
}

export interface NewPackageForm{
  planName: string,
  totalPrice: number,
  duration: number
}

export const default_new_package_form: NewPackageForm = {
  planName: '',
  totalPrice: 0,
  duration: 1
}