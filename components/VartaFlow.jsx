/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const VartaFlow = () => {
  const boxes = [
    {
      top: 'top-[10%]',
      left: 'left-[20%]',
      image:
        'https://i.pinimg.com/736x/3c/0e/04/3c0e04ae8fda1cbfc758fc755e6c5932.jpg',
      label: 'Simple Blog',
    },
    {
      top: 'top-[5%]',
      left: 'left-[45%]',
      image:
        'https://i.pinimg.com/736x/40/37/87/4037879abe8061f4e9a73098121a66f7.jpg',
      label: 'Wall of the Protest',
    },
    {
      top: 'top-[10%]',
      left: 'right-[20%]',
      image:
        'https://sreenivasaraos.com/wp-content/uploads/2016/04/discussions.jpg',
      label: 'Debate',
    },
    {
      top: 'top-[30%]',
      left: 'right-[5%]',
      image:
        'https://i.pinimg.com/736x/3f/f2/b1/3ff2b1669752b32066ab90d32d68b672.jpg',
      label: 'Just Ask',
    },
    {
      top: 'top-[10%]',
      left: 'right-[10%]',
      image:
        'https://i.pinimg.com/736x/98/ea/58/98ea58ff5ca8495f75c76e9028ea0aae.jpg',
      label: 'Lok Manthan',
    },
    {
      bottom: 'bottom-[30%]',
      left: 'right-[5%]',
      image:
        'https://i.pinimg.com/736x/57/a5/bf/57a5bf4a9f4757522568b1d5ff862037.jpg',
      label: 'Civic Polls',
    },
    {
      bottom: 'bottom-[10%]',
      left: 'right-[20%]',
      image:
        'https://i.pinimg.com/736x/4d/5b/08/4d5b083670a237b27e254cccd4133fa2.jpg',
      label: 'People’s Draft',
    },
    {
      bottom: 'bottom-[5%]',
      left: 'left-[45%]',
      image:
        'https://i.pinimg.com/736x/55/b1/02/55b102159c1c96ad2d5bf7c5836916ef.jpg',
      label: 'Project Management Tool',
    },
    {
      bottom: 'bottom-[10%]',
      left: 'left-[20%]',
      image:
        'https://i.pinimg.com/736x/2e/4b/74/2e4b74e751ce8a5a354aaeb91691d887.jpg',
      label: 'Jan Phael Prayog',
    },
    {
      bottom: 'bottom-[30%]',
      left: 'left-[5%]',
      image:
        'https://i.pinimg.com/736x/8f/f2/f1/8ff2f194b8fbc4ee3c4e38c5a1d43dd1.jpg',
      label: 'What If?',
    },
    {
      top: 'top-[30%]',
      left: 'left-[5%]',
      image:
        'https://i.pinimg.com/736x/62/4f/e4/624fe4cb7d3b8f7d1e94ef3c02f22eec.jpg',
      label: 'Mythbusters',
    },
  ];

  return (
    <div className="relative w-full min-h-screen bg-white flex items-center justify-center p-10">
      <svg className="absolute   w-full h-full z-0">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#555" />
          </marker>
        </defs>
        {boxes.map((box, i) => {
          const x1 = '50%';
          const y1 = '50%';
          const x2 = box.left?.includes('left')
            ? `${parseInt(box.left.replace(/[^0-9]/g, '')) + 5}%`
            : `${100 - parseInt(box.left?.replace(/[^0-9]/g, '')) - 5}%`;
          const y2 = box.top?.includes('top')
            ? `${parseInt(box.top.replace(/[^0-9]/g, '')) + 5}%`
            : `${100 - parseInt(box.bottom?.replace(/[^0-9]/g, '')) - 5}%`;

          return (
            <path
              key={`arrow-${i}`}
              d={`M 50% 50% C 50% 50%, ${x2} ${y1}, ${x2} ${y2}`}
              fill="none"
              stroke="#555"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
          );
        })}
      </svg>

      <div className="grid grid-cols-2 gap-4 z-10 bg-white p-4 rounded-xl shadow-lg">
        <Link to="/varta_explain" className="relative group">
          <img
            src="https://i.pinimg.com/736x/50/94/90/509490a113a87de2c2aa6c8e29339e4d.jpg"
            alt="Varta Laabh"
            className="rounded-md w-40 h-40 object-cover"
          />
          <p className="text-white absolute bottom-0 w-full text-center bg-black bg-opacity-60">
            वर्ता लाभ
          </p>
        </Link>
        <Link to="/samuhikcharcha_explain" className="relative group">
          <img
            src="https://i.pinimg.com/736x/9d/34/04/9d3404a487687eae4d1fa055dc6eb12f.jpg"
            alt="Samuhik Charcha"
            className="rounded-md w-40 h-40 object-cover"
          />
          <p className="text-white absolute bottom-0 w-full text-center bg-black bg-opacity-60">
            सामूहिक चर्चा
          </p>
        </Link>
        <Link to="/poochhobolo_explain" className="relative group">
          <img
            src="https://i.pinimg.com/736x/c4/b9/0c/c4b90c36f5941a3f3daabc385f00c8b4.jpg"
            alt="Poochho Bolo"
            className="rounded-md w-40 h-40 object-cover"
          />
          <p className="text-white absolute bottom-0 w-full text-center bg-black bg-opacity-60">
            पूछो बोलो
          </p>
        </Link>
        <Link to="/kaaryakendra_explain" className="relative group">
          <img
            src="https://i.pinimg.com/736x/e9/d7/8b/e9d78bb7b60d07fc58ade74d494aa672.jpg"
            alt="Kaaryakendra"
            className="rounded-md w-40 h-40 object-cover"
          />
          <p className="text-white absolute bottom-0 w-full text-center bg-black bg-opacity-60">
            कार्यकेंद्र
          </p>
        </Link>
      </div>

      {boxes.map((box, i) => (
        <div
          key={i}
          className={`absolute w-60 h-60 bg-white border border-gray-300 rounded-md overflow-hidden shadow-md flex flex-col items-center justify-center text-center text-xs font-medium text-black p-1 z-0 ${box.top || box.bottom} ${box.left || box.right}`}
        >
          <img src={box.image} alt={box.label} className="w-60  h-40  object-cover" />
          <span className="mt-1 px-1">{box.label}</span>
        </div>
      ))}
    </div>
  );
};

export default VartaFlow;
