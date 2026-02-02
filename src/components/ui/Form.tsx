"use client"

import { Slot } from "@radix-ui/react-slot"
import * as React from "react"
import { Controller, FormProvider, useFormContext, ControllerProps, FieldValues } from "react-hook-form"

import { Label } from "@/components/ui/Label"
import { cn } from "@/shared/utils/utils"

// Form Provider
const Form = FormProvider

// FormField Context
interface FormFieldContextValue {
  name: string
}

const FormFieldContext = React.createContext<FormFieldContextValue | undefined>(undefined)

// FormItem Context
interface FormItemContextValue {
  id: string
}
const FormItemContext = React.createContext<FormItemContextValue | undefined>(undefined)

// FormField component
interface FormFieldProps<T extends FieldValues> extends ControllerProps<T> {}

const FormField = <T extends FieldValues>({ ...props }: FormFieldProps<T>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name as string }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

// useFormField hook
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }
  if (!itemContext) {
    throw new Error("useFormField should be used within <FormItem>")
  }

  const fieldState = getFieldState(fieldContext.name, formState)
  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

// FormItem component
interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(({ className, ...props }, ref) => {
  const id = React.useId()
  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

// FormLabel component
interface FormLabelProps extends React.ComponentPropsWithoutRef<typeof Label> {
  className?: string
}

const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()
  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

// FormControl component
interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {}

const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()
  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={!error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

// FormDescription component
interface FormDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string
}

const FormDescription = React.forwardRef<HTMLParagraphElement, FormDescriptionProps>(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField()
    return <p ref={ref} id={formDescriptionId} className={cn("text-sm text-muted-foreground", className)} {...props} />
  }
)
FormDescription.displayName = "FormDescription"

// FormMessage component
interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string
  children?: React.ReactNode
}

const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField()
    const body = error ? String(error?.message) : children

    if (!body) return null

    return (
      <p ref={ref} id={formMessageId} className={cn("text-sm font-medium text-destructive", className)} {...props}>
        {body}
      </p>
    )
  }
)
FormMessage.displayName = "FormMessage"

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
}
