document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('anamnese-form');
    const allInputs = form.querySelectorAll('input, textarea');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Segura o envio para podermos formatar

        // Montar o relatório como se fosse um arquivo de bloco de notas!
        let relatorio = "=========================================\n";
        relatorio += "📋 FICHA DE ANAMNESE CORPORAL - RESULTADO\n";
        relatorio += "=========================================\n\n";

        const getVal = (id) => document.getElementById(id) ? document.getElementById(id).value.trim() : '';
        const getRadio = (name) => {
            const el = document.querySelector(`input[name="${name}"]:checked`);
            return el ? el.value : 'Não informado';
        };

        relatorio += "👤 DADOS PESSOAIS\n";
        relatorio += "-----------------------------------------\n";
        relatorio += `Nome: ${getVal('nome')}\n`;
        relatorio += `Idade: ${getVal('idade')} | Altura: ${getVal('altura')} | Peso (KG): ${getVal('peso')}\n`;
        relatorio += `Profissão: ${getVal('profissao')}\n`;
        relatorio += `Contato: ${getVal('telefone')} | E-mail: ${getVal('email')}\n\n`;

        relatorio += "🏋️ EXERCÍCIO FÍSICO\n";
        relatorio += "-----------------------------------------\n";
        relatorio += `Nível de Atividade: ${getRadio('NivelAtividade')}\n`;
        relatorio += `Já praticou musculação?: ${getRadio('JaPraticouMusculacao')}\n`;
        if (getVal('tempo_musculacao')) relatorio += `↳ Por quanto tempo: ${getVal('tempo_musculacao')}\n`;
        if (getVal('outra_atividade')) {
            relatorio += `Outras atividades: ${getVal('outra_atividade')}\n`;
            relatorio += `↳ Horário: ${getVal('horario_atividade')} | Frequência: ${getVal('frequencia_atividade')} | Duração: ${getVal('duracao_atividade')}\n`;
        }
        relatorio += `Pretende praticar musculação: ${getVal('pretensao_musculacao')}x na semana\n`;
        relatorio += `Tempo disponível por treino: ${getVal('tempo_disponivel')}\n\n`;

        relatorio += "🏥 DADOS CLÍNICOS / PATOLOGIAS\n";
        relatorio += "-----------------------------------------\n";
        relatorio += `Objetivos atuais: ${getVal('objetivos')}\n`;
        relatorio += `Maiores dificuldades: ${getVal('dificuldades')}\n`;
        relatorio += `Lesões ou cirurgias: ${getVal('lesoes') || 'Nenhuma'}\n`;
        relatorio += `Patologias: ${getVal('patologias') || 'Nenhuma'}\n`;
        relatorio += `Medicamentos controlados: ${getVal('medicamentos_controlados') || 'Nenhum'}\n\n`;

        relatorio += "🥗 ALIMENTAÇÃO\n";
        relatorio += "-----------------------------------------\n";
        if (getVal('acompanhamento_nutricional')) relatorio += `Acompanhamento Nutricional: ${getVal('acompanhamento_nutricional')}\n`;
        if (getVal('medicamentos_emagrecimento')) relatorio += `Medicamentos para emagrecimento: ${getVal('medicamentos_emagrecimento')}\n`;
        if (getVal('suplementos')) relatorio += `Suplementos alimentares: ${getVal('suplementos')}\n`;
        relatorio += `Alergia/Intolerância: ${getRadio('Alergia')}\n`;
        if (getVal('qual_alergia')) relatorio += `↳ Qual alergia: ${getVal('qual_alergia')}\n`;
        relatorio += `Estilo de dieta: ${getRadio('Dieta')}\n`;
        relatorio += `Consome Álcool: ${getRadio('Alcool')}\n`;
        if (getVal('freq_alcool')) relatorio += `↳ Frequência (álcool): ${getVal('freq_alcool')}\n`;
        relatorio += `Tabagismo: ${getRadio('Tabagismo')}\n\n`;

        relatorio += "⏰ ROTINA\n";
        relatorio += "-----------------------------------------\n";
        relatorio += `Rotina do dia a dia: ${getVal('rotina_dia') || 'Não informada'}\n`;
        relatorio += `Horas em pé: ${getVal('horas_em_pe')} | Horas sentado: ${getVal('horas_sentado')}\n`;
        relatorio += `Qualidade do sono: ${getRadio('QualidadeSono')} | Horas de sono: ${getVal('horas_sono')}h\n`;
        relatorio += `Costuma caminhar: ${getVal('caminhar') || 'Não informado'}\n\n`;
        if (getVal('outras_infos')) {
            relatorio += "📝 INFORMAÇÕES ADICIONAIS\n";
            relatorio += "-----------------------------------------\n";
            relatorio += `${getVal('outras_infos')}\n`;
        }

        // Criar um textarea invisível com todo esse texto estruturado
        const textareaFinal = document.createElement('textarea');
        textareaFinal.name = "DOCUMENTO_PREENCHIDO";
        textareaFinal.value = relatorio;
        textareaFinal.style.display = 'none';
        form.appendChild(textareaFinal);

        // Desativar todos os outros campos para que o Formspree só receba o relatório formatado
        allInputs.forEach(input => {
            input.disabled = true;
        });

        // Enviar o formulário
        form.submit();
        
        // Restaurar após envio (caso o usuário volte)
        setTimeout(() => {
            allInputs.forEach(input => input.disabled = false);
            form.removeChild(textareaFinal);
        }, 3000);
    });
    // Add 'filled' class to inputs when they have a value (Visuals)
    const dashedInputs = document.querySelectorAll('.dashed-input');
    dashedInputs.forEach(input => {
        if (input.value.trim() !== '') {
            input.classList.add('filled');
        }
        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                input.classList.add('filled');
            } else {
                input.classList.remove('filled');
            }
        });
    });

    // Phone number mask: (XX) X XXXX-XXXX
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function (e) {
            let v = e.target.value.replace(/\D/g, ''); // keep only numbers
            
            if (v.length === 0) {
                e.target.value = '';
                return;
            }
            
            let res = '(' + v.slice(0, 2);
            if (v.length > 2) {
                res += ') ' + v.slice(2, 3);
            }
            if (v.length > 3) {
                res += ' ' + v.slice(3, 7);
            }
            if (v.length > 7) {
                res += '-' + v.slice(7, 11);
            }
            
            e.target.value = res;
        });
    }
});
