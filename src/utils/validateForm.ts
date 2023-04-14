export function validateForm(formData: FormData) {
  const team = String(formData.get('team'));
  const type = String(formData.get('type'));
  const title = String(formData.get('title'));
  const description = String(formData.get('description'));
  const steps = String(formData.get('steps'));
  const technical = String(formData.get('technical'));
  const priority = String(formData.get('priority'));
  const attachments = String(formData.get('attachments'))

  const isValidBug =
    // TODO: Get username from the Store !!user &&
    !!team &&
    !!type &&
    !!title &&
    !!description &&
    !!steps &&
    !!technical &&
    !!priority;
  // TODO: !uploadingAttachs;

  const isValidRequest =
    // TODO: using new storage update!!storageData.user &&
    !!team && !!title && !!description;
  // TODO: !uploadingAttachs;

  return type == 'bug' ? isValidBug : isValidRequest;
}
