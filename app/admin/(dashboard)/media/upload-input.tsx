export function UploadInput() {
  return (
    <div>
      <label htmlFor="file" className="mb-1.5 block text-sm font-medium">
        File
      </label>
      <input
        id="file"
        name="file"
        type="file"
        required
        accept="image/jpeg,image/png,image/webp,image/avif,application/pdf"
        className="block w-full text-sm text-muted file:mr-4 file:rounded-md file:border file:border-border file:bg-surface file:px-4 file:py-2 file:text-sm file:text-foreground"
      />
    </div>
  );
}
