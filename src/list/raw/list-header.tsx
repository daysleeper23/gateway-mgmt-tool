const ListHeader = () => {
  return (
    <div
      data-testid="list-header"
      className="px-6 py-4 flex border-b gap-4 w-full bg-secondary text-sm text-primary font-medium items-center"
    >
      <div className="w-48">Gateway ID</div>
      <div>Description</div>

      <div className="ml-auto flex gap-4 items-center">
        <div className="w-28">Status</div>
        <div className="w-40">Model</div>
        <div className="w-20">Version</div>
        <div className="w-36">Last Message</div>
      </div>
    </div>
  );
};
export default ListHeader;
