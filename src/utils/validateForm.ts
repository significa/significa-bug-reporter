export function validateForm(formData: FormData) {
  const author = String(formData.get('author'));
  const team = String(formData.get('team'));
  const type = String(formData.get('type'));
  const title = String(formData.get('title'));
  const description = String(formData.get('description'));
  const steps = String(formData.get('steps'));
  const technical = String(formData.get('technical'));
  const priority = String(formData.get('priority'));

  const isValidBug =
    !!author &&
    !!team &&
    !!type &&
    !!title &&
    !!description &&
    !!steps &&
    !!technical &&
    !!priority;

  const isValidRequest = !!author && !!team && !!title && !!description;

  return type == 'bug' ? isValidBug : isValidRequest;
}
