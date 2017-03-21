/**
 * react练习
 * @authors Kerry W (wangxuan@eastcom-sw.com)
 * @date    2016-12-09 09:56:51
 * @version $Id$
 */
 var names = ['Alice', 'Emily', 'Kate'];

 ReactDOM.render(
   <div>
   {
     names.map(function (name) {
       return <div>Hello, {name}!</div>
     })
   }
   </div>,
   document.body
 );
