const ListHeader = () => {
  return (
    <div
      data-testid="list-header"
      className="p-6 flex border-b gap-4 w-full hover:bg-secondary text-primary font-medium"
    >
      <div className="w-48">Gateway ID</div>
      <div>Description</div>

      <div className="ml-auto flex gap-4">
        <div className="w-32">Status</div>
        <div className="w-40">Model</div>
        <div className="w-20">Version</div>
      </div>
    </div>
  );
};
export default ListHeader;
