

    var stepSimulacao =1;
      function mostrarSimulações()
      {
        if(stepSimulacao==1)
        {
          jQuery('.simular-modalidade').fadeIn();
          stepSimulacao=2;
        }
        else if(stepSimulacao==2)
        {
          jQuery('.simular-tempo').show();
          $('#ex19').slider();
          stepSimulacao=3;
        }
        else if(stepSimulacao==3)
        {
          jQuery('.simular-valor-desejado').hide();
          jQuery('.simular-modalidade').hide();
          jQuery('.simular-tempo').hide();
          jQuery('.btn-next').hide();
          jQuery('.simular-resultado').fadeIn();
          jQuery('.btn-prev').fadeIn();
          $( ".simular-investimento" ).addClass( "white" );
        }
        
      }
      
      function voltarSimulações()
      {

          jQuery('.simular-valor-desejado').fadeIn();
          jQuery('.simular-modalidade').fadeIn();
          jQuery('.simular-tempo').fadeIn();
          jQuery('.btn-next').fadeIn();
          jQuery('.simular-resultado').hide();
          jQuery('.btn-prev').hide();
          $( ".simular-investimento" ).removeClass( "white" );
        }

  function toogleChat()
      {

          $( ".body-chat" ).toggle();
          
        }

      jQuery('.continuar-btn').click(function(){
        mostrarSimulações();
      });
      
      jQuery('.previus-btn').click(function(){
        voltarSimulações();
      });
      
	  jQuery('.topo-chat').click(function(){
        toogleChat();
      });

	  