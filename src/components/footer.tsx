const Footer = () => {
  return (
    <footer className="mt-8 w-full text-center">
    <div className="border-t border-gray-700 pt-4">
      <p className="text-gray-400">Connect with us:</p>
      <div className="flex justify-center space-x-4 mt-2">
        <a href="https://github.com/icaruskb/hackutd2024" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">GitHub</a>
        <a href="https://www.linkedin.com/in/raphael-co-108a4a209/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">LinkedIn</a>
      </div>
      <p className="text-gray-400 mt-8">Project Created for HackUTD 2024</p>
    </div>
  </footer>
  );
};

export default Footer;